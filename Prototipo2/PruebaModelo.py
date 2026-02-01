# PruebaModelo.py
import cv2
import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms
from PruebaEntrenamiento import RedNeuronal 

# ========== 1. Configuración ==========
device = "cuda" if torch.cuda.is_available() else "cpu"
print("Usando", device)

# Mismas clases que en ImageFolder (en orden alfabético de carpetas)
CLASSES = ['A','B','C','D','E','F','G','I','K','L','M','N','O','P','Q','R','S','T','U']

# Transform igual que en entrenamiento (sin augmentación extra)
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize((0.5,0.5,0.5),
                         (0.5,0.5,0.5)),
])

# ========== 2. Cargar modelo ==========
num_classes = len(CLASSES)
modelo = RedNeuronal(num_classes).to(device)

state_dict = torch.load("Prototipo2\modelo_lse_2.pth", map_location=device)
modelo.load_state_dict(state_dict)
modelo.eval()
print("Modelo cargado")

# ========== 3. Función de predicción ==========
def predecir_frame(img_bgr):
    # Recortar un cuadrado central como ROI
    h, w, _ = img_bgr.shape
    size = min(h, w)
    y1 = (h - size) // 2
    x1 = (w - size) // 2
    roi = img_bgr[y1:y1+size, x1:x1+size]

    # Convertir BGR (OpenCV) -> RGB y aplicar transform
    img_rgb = cv2.cvtColor(roi, cv2.COLOR_BGR2RGB)
    pil = transforms.functional.to_pil_image(img_rgb)
    tensor = transform(pil).unsqueeze(0).to(device)  # shape: (1,3,224,224)

    with torch.no_grad():
        logits = modelo(tensor)
        pred_idx = logits.argmax(1).item()
        prob = torch.softmax(logits, dim=1)[0, pred_idx].item()

    return CLASSES[pred_idx], prob, (x1, y1, size)

# ========== 4. Bucle de webcam ==========
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("No se pudo abrir la cámara")
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        break

    letra, prob, (x1, y1, size) = predecir_frame(frame)

    # Dibujar recuadro y texto
    cv2.rectangle(frame, (x1, y1), (x1+size, y1+size), (0,255,0), 2)
    texto = f"{letra}  ({prob*100:0.1f}%)"
    cv2.putText(frame, texto, (10, 30),
                cv2.FONT_HERSHEY_SIMPLEX, 1, (0,255,0), 2, cv2.LINE_AA)

    cv2.imshow("LSE - Prueba de modelo", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
