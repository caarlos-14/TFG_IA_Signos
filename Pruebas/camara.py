import cv2

def main():
    cap = cv2.VideoCapture(0)  # 0 = webcam por defecto
    if not cap.isOpened():
        print("No se pudo abrir la cámara")
        return

    while True:
        ret, frame = cap.read()
        if not ret:
            print("No se pudo leer el frame")
            break

        # Voltear horizontalmente para que se vea como espejo
        frame = cv2.flip(frame, 1)

        cv2.imshow("Webcam - pulsa q para salir", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
