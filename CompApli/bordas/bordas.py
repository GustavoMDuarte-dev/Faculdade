import cv2
import numpy as np
import matplotlib.pyplot as plt

def carregar_e_processar_imagem(caminho_imagem, parametros):
    img_original = cv2.imread(caminho_imagem)

    if img_original is None:
        print(f"Erro ao carregar a imagem: {caminho_imagem}")
        print("Verifique se o caminho do arquivo está correto e se a imagem existe.")
        return

    img_cinza = cv2.cvtColor(img_original, cv2.COLOR_BGR2GRAY)
    
    img_pre_processada = img_cinza.copy()

    if parametros['usar_filtro_mediana']:
        img_pre_processada = cv2.medianBlur(img_pre_processada, parametros['mediana_ksize'])
    
    if parametros['usar_filtro_gaussiano']:
        img_pre_processada = cv2.GaussianBlur(img_pre_processada, parametros['gaussiano_ksize'], 0)

    sobel_x = cv2.Sobel(img_cinza, cv2.CV_64F, 1, 0, ksize=parametros['sobel_ksize'])
    sobel_y = cv2.Sobel(img_cinza, cv2.CV_64F, 0, 1, ksize=parametros['sobel_ksize'])
    img_sobel_magnitude = cv2.convertScaleAbs(cv2.magnitude(sobel_x, sobel_y))

    img_canny = cv2.Canny(img_pre_processada, 
                           parametros['canny_t1'], 
                           parametros['canny_t2'])

    plt.figure(figsize=(15, 10))

    plt.subplot(2, 2, 1)
    plt.imshow(cv2.cvtColor(img_original, cv2.COLOR_BGR2RGB))
    plt.title('Imagem Original')
    plt.axis('off')

    plt.subplot(2, 2, 2)
    plt.imshow(img_pre_processada, cmap='gray')
    plt.title('Imagem Pré-Processada')
    plt.axis('off')

    plt.subplot(2, 2, 3)
    plt.imshow(img_sobel_magnitude, cmap='gray')
    plt.title(f"Filtro de Sobel (ksize={parametros['sobel_ksize']})")
    plt.axis('off')

    plt.subplot(2, 2, 4)
    plt.imshow(img_canny, cmap='gray')
    plt.title(f"Filtro de Canny (T1={parametros['canny_t1']}, T2={parametros['canny_t2']})")
    plt.axis('off')

    plt.tight_layout()
    plt.show()

if __name__ == '__main__':
    caminho_da_imagem = 'sua_imagem_de_ultrassom.jpg'

    parametros_de_processamento = {
        'usar_filtro_mediana': True, 
        'mediana_ksize': 5,
        'usar_filtro_gaussiano': False,
        'gaussiano_ksize': (5, 5),
        'sobel_ksize': 3,
        'canny_t1': 60,
        'canny_t2': 180
    }
    
    carregar_e_processar_imagem(caminho_da_imagem, parametros_de_processamento)
    
    print("\nInstruções para executar o código:")
    print("1. Salve este código como um arquivo .py (ex: processador_imagens.py).")
    print(f"2. Atualize a variável 'caminho_da_imagem' com o nome do seu ficheiro.")
    print("3. Ajuste os valores no dicionário 'parametros_de_processamento' para experimentar.")
    print("4. Tenha Python e as bibliotecas OpenCV e Matplotlib instaladas.")
    print("   (pip install opencv-python matplotlib numpy)")
    print("5. Execute o script a partir do terminal: python processador_imagens.py")
