document.addEventListener('DOMContentLoaded', function () {
    const canastaItems = [];
    const productos = document.querySelectorAll('.producto');
    const canastaContainer = document.getElementById('canasta-items');
    const totalElement = document.getElementById('total');
    const canastaContador = document.getElementById('canasta-contador');
    const comprarButton = document.getElementById('comprar');
    const canastaIcono = document.getElementById('canasta-icono');
    const modal = document.getElementById('canasta-modal');
    const closeModal = document.getElementById('close-modal');
    const contactoLink = document.getElementById('contacto-link');
    const contactoFooterLink = document.getElementById('contacto-footer-link');

    productos.forEach(producto => {
        producto.querySelector('.agregar-canasta').addEventListener('click', function () {
            const nombre = producto.getAttribute('data-nombre');
            const precio = parseFloat(producto.getAttribute('data-precio'));
            const imagen = producto.getAttribute('data-imagen');

            // Buscar si el producto ya está en la canasta
            const itemExistente = canastaItems.find(item => item.nombre === nombre);

            if (itemExistente) {
                // Si ya existe, incrementar la cantidad y actualizar el precio
                itemExistente.cantidad++;
                itemExistente.precioTotal += precio;
            } else {
                // Si no existe, agregar un nuevo producto
                canastaItems.push({ nombre, precio, imagen, cantidad: 1, precioTotal: precio });
            }

            actualizarCanasta();
        });
    });

    function actualizarCanasta() {
        canastaContainer.innerHTML = '';
        let total = 0;

        canastaItems.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('canasta-item');

            const imgElement = document.createElement('img');
            imgElement.src = item.imagen;
            imgElement.alt = item.nombre;
            imgElement.classList.add('canasta-item-img');

            const contentElement = document.createElement('div');
            contentElement.classList.add('canasta-item-content');
            contentElement.textContent = `${item.nombre} x${item.cantidad} - $${item.precioTotal}`;

            const eliminarButton = document.createElement('button');
            eliminarButton.textContent = 'Eliminar';
            eliminarButton.classList.add('eliminar-item');
            eliminarButton.addEventListener('click', function () {
                eliminarProducto(index);
            });

            itemElement.appendChild(imgElement);
            itemElement.appendChild(contentElement);
            itemElement.appendChild(eliminarButton);
            canastaContainer.appendChild(itemElement);
            
            total += item.precioTotal;
        });

        totalElement.textContent = total;
        canastaContador.textContent = canastaItems.length;
    }

    function eliminarProducto(index) {
        if (canastaItems[index].cantidad > 1) {
            canastaItems[index].cantidad--;
            canastaItems[index].precioTotal -= canastaItems[index].precio;
        } else {
            canastaItems.splice(index, 1);
        }
        actualizarCanasta();
    }

    canastaIcono.addEventListener('click', function () {
        modal.classList.add('show');
    });

    closeModal.addEventListener('click', function () {
        modal.classList.remove('show');
    });

    comprarButton.addEventListener('click', function () {
        if (canastaItems.length === 0) {
            alert('Tu canasta está vacía');
            return;
        }

        let mensaje = 'Hola, quiero comprar:\n';
        canastaItems.forEach(item => {
            mensaje += `- ${item.nombre} x${item.cantidad} por $${item.precioTotal}\n`;
        });

        mensaje += `Total: $${totalElement.textContent}`;
        const url = `https://wa.me/5493472611258?text=${encodeURIComponent(mensaje)}`;
        window.open(url, '_blank');

        modal.classList.remove('show'); // Cerrar la ventana modal al hacer la compra
    });

    contactoLink.addEventListener('click', function () {
        const whatsappURL = "https://wa.me/xxxxxxxxx";
        window.open(whatsappURL, '_blank');
    });

    contactoFooterLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default link behavior
        const whatsappURL = "https://wa.me/xxxxxxxxx";
        window.open(whatsappURL, '_blank');
    });
});
