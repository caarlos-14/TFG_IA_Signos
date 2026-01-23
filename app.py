import torch

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("Usando dispositivo:", device)

if device.type == "cuda":
    print("GPU:", torch.cuda.get_device_name(0))
