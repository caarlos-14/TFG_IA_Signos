import torch
import torch.nn as nn
import torch.nn.functional as F
from torch.utils.data import DataLoader, random_split
from torchvision import datasets, transforms


# =========================================================
# 1. Dispositivo
# =========================================================
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Usando {device}")


# =========================================================
# 2. Transforms y Dataset
# =========================================================


# Convertirmos las imagenes grande a un tamaño de de 224 x 224 y lo movemos a los tensores
# En el Prototipo 2 añadimos DATA AUGMENTATION para el conjunto de entrenamiento
train_transform = transforms.Compose([
    transforms.Resize((256, 256)),
    transforms.RandomResizedCrop(224, scale=(0.8, 1.0)),
    transforms.RandomHorizontalFlip(p=0.5),
    transforms.ColorJitter(brightness=0.2, contrast=0.2, saturation=0.2),
    transforms.RandomRotation(10),
    transforms.ToTensor(),
    transforms.Normalize(
        (0.5, 0.5, 0.5),
        (0.5, 0.5, 0.5)
    ),
])

# Para validación y test usamos solo resize + normalización (sin augment)
test_transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(
        (0.5, 0.5, 0.5),
        (0.5, 0.5, 0.5)
    ),
])


full_dataset = datasets.ImageFolder(
    root="datos",
    transform=train_transform   # este transform se usará para el split de entrenamiento
)


# Dividimos los datos en 3 datasets: entrenamiento, validacion y prueba
total = len(full_dataset)
train_size = int(0.8 * total)
val_size   = int(0.1 * total)
test_size  = total - train_size - val_size


# Mezclamos aleatoriamente las imagenes del dataset
train_dataset, val_dataset, test_dataset = random_split(
    full_dataset,
    [train_size, val_size, test_size],
    generator=torch.Generator().manual_seed(42)
)

# Para que validación y test no tengan augmentación, cambiamos su transform
val_dataset.dataset.transform  = test_transform
test_dataset.dataset.transform = test_transform


# Dividimos en lotes de 32 imagenes para no meterle de lleno el total del dataset de entrenamiento
BATCH_SIZE = 32


# Indicamos cuales son datos de entrenamiento y cuales no (shuffle=x)
train_loader = DataLoader(train_dataset, batch_size=BATCH_SIZE, shuffle=True)
val_loader   = DataLoader(val_dataset,   batch_size=BATCH_SIZE, shuffle=False)
test_loader  = DataLoader(test_dataset,  batch_size=BATCH_SIZE, shuffle=False)


# Mostramos la informacion
print("Clases:", full_dataset.classes)
num_classes = len(full_dataset.classes)
print("Número de clases:", num_classes)
print(
    "Total:", total,
    " → train:", len(train_dataset),
    " val:", len(val_dataset),
    " test:", len(test_dataset)
)


# =========================================================
# 3. Modelo CNN
# =========================================================


# Creamos el esquema de nuestra red neuronal
class RedNeuronal(nn.Module):


    # Inicializa la red neuronal con parametros aleatorios
    def __init__(self, num_classes, p_dropout=0.5):
        super().__init__()
        # Capas convolucionales + max pooling (extractores de características)
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3, padding=1)
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3, padding=1)
        self.pool  = nn.MaxPool2d(2, 2)

        # Dropout 2D sobre los mapas de características (regularización extra)
        self.dropout_conv = nn.Dropout2d(p=0.2)

        # Red neuronal
        self.fc1 = nn.Linear(64 * 56 * 56, 128)

        # Dropout en la parte totalmente conectada
        self.dropout_fc = nn.Dropout(p=p_dropout)

        # Capa de salida(19 neuronas / num_classes = 19)
        self.fc2 = nn.Linear(128, num_classes)


    # Propagacion hacia Adelante (Toma un dato y trata de predecir que clase es con los parametros aleatorios)
    # Creacion del funcionamiento de la neurona
    def forward(self, x):
        x = F.relu(self.conv1(x))
        x = self.pool(x)
        x = self.dropout_conv(x)      # dropout en features

        x = F.relu(self.conv2(x))
        x = self.pool(x)
        x = self.dropout_conv(x)      # dropout en features

        x = torch.flatten(x, 1)
        x = F.relu(self.fc1(x))
        x = self.dropout_fc(x)        # dropout en la capa densa
        x = self.fc2(x)
        return x


modelo = RedNeuronal(num_classes, p_dropout=0.5).to(device)
print(modelo)


# =========================================================
# 4. Hiperparámetros, pérdida y optimizador
# =========================================================
TASA_APRENDIZAJE = 0.001


# Repeticiones de entrenamiento
EPOCHS = 10


fn_perdida = nn.CrossEntropyLoss()
optimizador = torch.optim.Adam(modelo.parameters(), lr=TASA_APRENDIZAJE)


# =========================================================
# 5. Bucle de entrenamiento
# =========================================================


# Funcion para entrenar usando el forward y el backward
def train_loop(dataloader, model, loss_fn, optimizer):
    train_size = len(dataloader.dataset)
    nlotes = len(dataloader)

    model.train()

    # Variables inicializadas para poder el rendimiento de la red neuronal
    perdida_train = 0.0
    exactitud = 0.0

    for nlote, (X, y) in enumerate(dataloader):
        X, y = X.to(device), y.to(device)

        # Propagacion hacia adelante
        logits = model(X)
        loss = loss_fn(logits, y)
        # Propagacion hacia Atras para actualizar los parametros segun la gradiente
        loss.backward()
        optimizer.step()
        optimizer.zero_grad()

        perdida_train += loss.item()
        exactitud += (logits.argmax(1) == y).type(torch.float).sum().item()

        if nlote % 10 == 0:
            ndatos = nlote * dataloader.batch_size
            print(f"\tPérdida: {loss.item():>7f}  [{ndatos:>5d}/{train_size:>5d}]")

    perdida_train /= nlotes
    exactitud /= train_size

    print(f"\tExactitud/pérdida promedio:")
    print(f"\t\tEntrenamiento: {(100*exactitud):>0.1f}% / {perdida_train:>8f}")


# =========================================================
# 6. Bucle de validación
# =========================================================


# Funcion para validar y ver el rendimiento con nuevos datos fuera del entrenamiento
def val_loop(dataloader, model, loss_fn):
    val_size = len(dataloader.dataset)
    nlotes = len(dataloader)

    model.eval()

    # Variables inicializadas para poder el rendimiento de la red neuronal frente a datos no vistos
    perdida_val = 0.0
    exactitud = 0.0

    # Le decimos que no actualizaremos los parametros
    with torch.no_grad():
        for X, y in dataloader:
            X, y = X.to(device), y.to(device)

            logits = model(X)

            perdida_val += loss_fn(logits, y).item()
            exactitud += (logits.argmax(1) == y).type(torch.float).sum().item()

    perdida_val /= nlotes
    exactitud /= val_size

    print(f"\t\tValidación: {(100*exactitud):>0.1f}% / {perdida_val:>8f}\n")


# =========================================================
# 7. Bucle de test
# =========================================================


# Funcion para testear en bucle con sets de datos de prueba para verificar el rendimiento final
def test_loop(dataloader, model, loss_fn):
    test_size = len(dataloader.dataset)
    nlotes = len(dataloader)

    model.eval()

    perdida_test = 0.0
    exactitud = 0.0

    with torch.no_grad():
        for X, y in dataloader:
            X, y = X.to(device), y.to(device)
            logits = model(X)
            perdida_test += loss_fn(logits, y).item()
            exactitud += (logits.argmax(1) == y).type(torch.float).sum().item()

    perdida_test /= nlotes
    exactitud /= test_size
    print(f"TEST: {100*exactitud:0.1f}%  / pérdida {perdida_test:0.4f}")


# =========================================================
# 8. Entrenar, guardar y probar (todo seguido)
# =========================================================


# Ejecutamos las funciones echas anteiormente ingresando las variables correctamente con los datos
if __name__ == "__main__":
    for t in range(EPOCHS):
        print(f"Iteración {t+1}/{EPOCHS}\n-------------------------------")
        train_loop(train_loader, modelo, fn_perdida, optimizador)
        val_loop(val_loader, modelo, fn_perdida)

    print("Listo, el modelo ha sido entrenado!")

    # Guardamos el modelo entrenado
    ruta_modelo = "Prototipo2\\modelo_lse_2.pth"
    torch.save(modelo.state_dict(), ruta_modelo)
    print(f"Modelo guardado en {ruta_modelo}")

    # Ejecutamos el buble de testeo 
    test_loop(test_loader, modelo, fn_perdida)