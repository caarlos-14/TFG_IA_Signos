import cv2
import torch
from torchvision import transforms
from PruebaEntrenamiento import RedNeuronal

device = "cuda" if torch.cuda.is_available() else "cpu"
print("Usando", device)

CLASSES = ['A','B','C','D','E','F','G','I','K','L','M','N','O','P','Q','R','S','T','U']

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize((0.5,0.5,0.5),
                         (0.5,0.5,0.5)),
])

num_classes = len(CLASSES)
modelo = RedNeuronal(num_classes).to(device)

state_dict = torch.load("Prototipo2\\modelo_lse_2.pth", map_location=device)
modelo.load_state_dict(state_dict)
modelo.eval()
print("Modelo cargado")

def predecir_imagen(ruta):
    img_bgr = cv2.imread(ruta)
    if img_bgr is None:
        print("No se pudo leer", ruta)
        return

    # recorte central cuadrado igual que antes
    h, w, _ = img_bgr.shape
    size = min(h, w)
    y1 = (h - size) // 2
    x1 = (w - size) // 2
    roi = img_bgr[y1:y1+size, x1:x1+size]

    img_rgb = cv2.cvtColor(roi, cv2.COLOR_BGR2RGB)
    pil = transforms.functional.to_pil_image(img_rgb)
    tensor = transform(pil).unsqueeze(0).to(device)

    with torch.no_grad():
        logits = modelo(tensor)
        pred_idx = logits.argmax(1).item()
        prob = torch.softmax(logits, dim=1)[0, pred_idx].item()

    letra = CLASSES[pred_idx]
    print(f"{ruta} -> {letra} ({prob*100:0.1f}%)")

if __name__ == "__main__":
    rutas = [
        "Prototipo2/tests/a.jpg",
        "Prototipo2/tests/b.png",
        "Prototipo2/tests/c.png",
        "Prototipo2/tests/d.png",
        "Prototipo2/tests/e.png",
        "Prototipo2/tests/f.png",
        "Prototipo2/tests/g.png",
        "Prototipo2/tests/i.png",
        "Prototipo2/tests/k.png",
        "Prototipo2/tests/l.png",
        "Prototipo2/tests/m.png",
        "Prototipo2/tests/n.png",
        "Prototipo2/tests/o.png",
        "Prototipo2/tests/p.png",
        "Prototipo2/tests/q.png",
        "Prototipo2/tests/r.png",
        "Prototipo2/tests/s.png",
        "Prototipo2/tests/t.png",
        "Prototipo2/tests/u.png",
    ]
    for r in rutas:
        predecir_imagen(r)