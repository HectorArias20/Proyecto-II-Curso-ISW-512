 /* Menu Ocultar */
 var navlink = document.getElementById("navlink");

 function showMenu() {
     navlink.style.right = "0";
 }

 function hideMenu() {
     navlink.style.right = "-200px";
 }




 /* --------- Slider -------------------- */

 let products = JSON.parse(localStorage.getItem("products"));
 for (let i = 0; i < products.length; i++) {
     document.getElementById("swipe").innerHTML = `<div class="swiper-wrapper">
<!-- Slides -->
<div class="swiper-slide" id="sli"><img src="${products[i].u}" alt="co">
<p id="nom">${products[i].nombre}</p>

</div>

</div>
<div class="swiper-button-prev"></div>
<div class="swiper-button-next"></div>

`
 };

 const swiper = new Swiper('.swiper', {

     loop: true,


     // Navigation arrows
     navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
     },
 });

 /* ------- Fin Slider ----------- */






 /* ----- Registro de Usuarios -------- */

 function guardar_usuarios(e) {
     e = e || window.event;

     var nombre = document.getElementById("nombre").value;
     var apellido = document.getElementById("apellido").value;
     var direccion1 = document.getElementById("direccion1").value;
     var direccion2 = document.getElementById("direccion2").value;
     var opcion = document.getElementById("opcion").value;
     var ciudad = document.getElementById("ciudad").value;
     var email = document.getElementById("email").value;
     var contra = document.getElementById("contra").value;

     if (nombre != "" && apellido != "" && direccion1 != "" && direccion2 != "" && opcion != "" && ciudad != "" && email != "" && contra != "") {
         var usuario = {
             nombre: nombre,
             apellido: apellido,
             direccion1: direccion1,
             direccion2: direccion2,
             opcion: opcion,
             ciudad: ciudad,
             email: email,
             contra: contra
         };

         var usuario_agregado = JSON.parse(localStorage.getItem(email));

         if (usuario_agregado === null) {
             localStorage.setItem(email, JSON.stringify(usuario));


             $('#DatosIncompletos').modal("show");

             document.getElementById("exampleModalLabel").innerHTML = "Usuarios";
             document.getElementById("error").innerHTML = "Usuario registrado con exito";
             e.preventDefault();



         } else {
             $('#DatosIncompletos').modal("show");
             document.getElementById("exampleModalLabel").innerHTML = "Usuarios";
             document.getElementById("error").innerHTML = "Este nombre de usuario ya existe";
             e.preventDefault();


         }

     } else {

         $('#DatosIncompletos').modal("show");
         document.getElementById("exampleModalLabel").innerHTML = "Denegado";
         e.preventDefault();


         e.preventDefault();

     }
 }

 function redireccionarpagina() {
     if (document.getElementById("error").innerHTML == "Usuario registrado con exito") {
         window.location.href = "pagina-login.html";
     }
 }



 function login() {
     event.preventDefault();

     var email = document.getElementById("email").value;
     var contra = document.getElementById("contra").value;
     try {
         var usuario_agregado = JSON.parse(localStorage.getItem(email));

     } catch (Exception) {

     }
     if (usuario_agregado != null) {

         if (usuario_agregado.contra === contra) {

             sessionStorage.setItem("ingreso", email);
             location.href = "pagina-dashboard.html";
             event.preventDefault();


         } else {

             $('#DatosIncompletos').modal("show");

             document.getElementById("exampleModalLabel").innerHTML = "Usuarios";
             document.getElementById("error").innerHTML = "La contraseña no coinciden";

         }

     } else {

         $('#DatosIncompletos').modal("show");

         document.getElementById("exampleModalLabel").innerHTML = "Usuarios";
         document.getElementById("error").innerHTML = "El usuario no existe";

     }
 }



 /* --------- Productos --------- */


 function guardar_productos() {
     var email = sessionStorage.getItem("ingreso");
     const nombre_producto = $('#nombre_producto').val();
     const descri = $('#des_producto').val();
     const ur = $('#url_img').val();
     const bus = $('#busco').val();

     //insert to a database
     let productsDb = JSON.parse(localStorage.getItem('products'));
     if (!productsDb) {
         productsDb = [];
     }
     const product = {
         em: email,
         nombre: nombre_producto,
         descr: descri,
         u: ur,
         busc: bus,
         id: productsDb.length + 1
     }
     productsDb.push(product);
     localStorage.setItem('products', JSON.stringify(productsDb));
     console.log(JSON.parse(localStorage.getItem('products')));
     sessionStorage.setItem("Producto Creado", email);

     if (sessionStorage.getItem("Producto Creado") == email) {

         $("#DatosIncompletos").modal("show");
         document.getElementById("exampleModalLabel").innerHTML = "Usuarios";
         document.getElementById("error").innerHTML = "Producto Creado";
         sessionStorage.setItem("Producto Creado", -1);
         event.preventDefault();

     }

 }

 /* ------  Ver productos en dashboard ------ */
 function verproductos() {
     const products = JSON.parse(localStorage.getItem('products'));
     const table = document.getElementById('authors_table');


     if (products) {
         let rows = "";
         products.forEach((product, index) => {
             let row = `<tr>`;
             row += `<td><img src="${product.u}" style: width="120" height="100"></img></td> </br>`;
             row += `<td> <a onclick="editproduct(${product.id})" class="link edit">Editar</a></td>`;
             row += `<td> <a  onclick="deleteproducts(${product.id})" class="link delete">Eliminar</a>  </td>`;
             rows += row + "</tr>";
         });
         table.innerHTML = rows;
     }
 }

 /* ----- Ver productos en Cambalache ----- */
 function verproductos2() {
     const productss = JSON.parse(localStorage.getItem('products'));
     const tables = document.getElementById('author_table');


     if (productss) {
         let rows = "";
         productss.forEach((product, index) => {
             let row = `<tr>`;
             row += `<td><a onclick="detalle_producto(${product.id})"><img src="${product.u}" style: width="120" height="100"></a></td> </br></br>`;
             row += `<td></br></br><p class="item-g"> ${product.descr}</p></td>`;
             row += `<td><p class="item-g"> ${product.em} </p></td>`;
             rows += row + "</tr>";
         });
         tables.innerHTML = rows;
     }
 }

 /* ----  Pagina Detalle de Producto ----- */
 function detalle_producto(idproduct) {
     let products = JSON.parse(localStorage.getItem("products"))
     for (let i = 0; i < products.length; i++) {
         if (products[i].id === idproduct) {
             document.getElementById('text').innerHTML = `  <section class="header3">
             <nav>
                 <img src="img/cambalache.jpg" alt="imagen">
                 <div class="nav-links" id="navlink">
                     <i class="fa fa-window-close" onclick="hideMenu()"> </i>
                     <ul>
                         <li><a href="pagina-inicio.html">  Inicio </a></li>
                         <li><a href="pagina-cambalaches.html"> Cambalaches </a></li>
                         <li><a href="pagina-login.html"> Ingresar </a></li>
                     </ul>
                     <button class="buton1">MiCarrito</button>
                 </div>
                 <i class="fa fa-bars" onclick="showMenu()"> </i>
             </nav>
         </section>
         <section>
         <div class = "text-box14">
         <div class=tex> <div class=ima>
         <img src="${products[i].u}" alt="imagen" style: width="400" height="350">
         </div>
            <h1 style="font-size: 18px;">${products[i].nombre}</h1>
            <p>Ofrecido por:</p>
            <p class="nombre">${products[i].em}</p>
            <p>___________________________________________</p>
            <h4 style="font-size: 18px;">DESCRIPCIÓN</h4>
            <p>${products[i].descr}</p>
            <br>
            <h4 style="font-size: 18px;">BUSCO</h4>
            <p>${products[i].busc} </p>
            <p id="sea17">______________</p>
            <br>
            <button class="icon1"> Agregar </button>
            <a href="pagina-cambalaches.html" class="icon"> Cancelar </a>
            </div>
            </div>
            </section>
            <section>
            <footer>
                <div class="container_footer2">
                    <div class="footer_menu">
                        <a href="#"> Inicio </a>
                        <a href="#"> Cambalaches </a>
                        <a href="#"> Ingresar </a>
                    </div>
                    <div class="text-box6">
                        <p>&copy;Cambalache.net</p>
                    </div>
                </div>
            </footer>
        </section>`
         };
     }
 }
 detalle_producto(idproduct);


 /* ------ Editar, actualizar y eliminar productos ------ */


 function editproduct(idproduct) {
     let products = JSON.parse(localStorage.getItem("products"));
     for (let i = 0; i < products.length; i++) {
         if (products[i].id === idproduct) {
             document.getElementById('table1').innerHTML = ` <section class="header3">
             <nav>
                 <img src="img/cambalache.jpg" alt="imagen">
                 <div class="nav-links" id="navlink">
                     <i class="fa fa-window-close" onclick="hideMenu()"> </i>
                     <ul>
                     <li><input type="submit" value="Logout" id="logout" class="b"></li>
                         <li><label id="nombreusuario"></label><a href="pagina-inicio.html">  Inicio </a></li>
                         <li><a href="pagina-cambalaches.html"> Cambalaches </a></li>
                         <li><a href="pagina-login.html"> Ingresar </a></li>
                     </ul>
                     <button class="buton1">MiCarrito</button>
                 </div>
                 <i class="fa fa-bars" onclick="showMenu()"> </i>
             </nav>
         </section><section> <div class="text-box8">
             <h1> Editar Producto </h1>
             <p>___________________________________</p>
         </div><div class="text-box11">
             <p> Ingrese aqui la informacion del Producto que desea incluir en Cambalache.net </p>
             <form id="eli">
                 <input type="text" class="nueve" id="newnombre" placeholder="${ products[i].nombre}">
                 <br>
                 <input type="text" class="diez" id="newdescripcion" placeholder=" ${products[i].descr}">
                 <br>
                 <input type="url" class="once" id="newurl" placeholder=" ${products[i].u}">
                 <br>
                 <input type="text" class="doce" id="newbusco" placeholder=" ${products[i].busc}">
                 <br>
                 <p>____________________________________________________________________________</p>
                 <button class="icon1" onclick="actualizar_productos(${i});"> Actualizar </button>
                 <a href="pagina-dashboard.html" class="icon"> Cancelar </a>
             </form>
         </div> 
         </section>
         <section>
         <footer>
             <div class="container_footer4">
                 <div class="footer_menu">
                     <a href="#"> Inicio </a>
                     <a href="#"> Cambalaches </a>
                     <a href="#"> Ingresar </a>
                 </div>
                 <div class="text-box6">
                     <p>&copy;Cambalache.net</p>
                 </div>
             </div>
         </footer>
     </section>`
         }

     }

 }
 editproduct(idproduct);

 function actualizar_productos(i) {
     let products = JSON.parse(localStorage.getItem("products"));
     products[i].nombre = document.getElementById("newnombre").value;
     products[i].descr = document.getElementById("newdescripcion").value;
     products[i].u = document.getElementById("newurl").value;
     products[i].busc = document.getElementById("newbusco").value;
     localStorage.setItem("products", JSON.stringify(products));
     verproductos();
 }
 actualizar_productos(i);

 function deleteproducts(idproduct) {
     $('#DatosIncompletos').modal("show");


     document.getElementById("exampleModalLabel").innerHTML = "Usuarios";
     document.getElementById("error").innerHTML = "¿Desea eliminar este producto?";


     let products = JSON.parse(localStorage.getItem('products'));
     for (let i = 0; i < products.length; i++) {
         if (products[i].id === idproduct) {
             products.splice(i, 1);
         }
     }
     localStorage.setItem("products", JSON.stringify(products));
     verproductos();
 }



 function redireccionar() {

     if (document.getElementById("error").innerHTML == "Producto Creado") {
         window.location.href = "pagina-dashboard.html";
     }
     if (document.getElementById("error").innerHTML == "Por favor complete") {
         window.location.href = "pagina-crear-editar-producto.html";
     }

 }



 /* ------------------ Fin Productos ------------- */

 /* ------- Cerrar Session ------- */

 function handleLogout() {
     window.sessionStorage.clear();
     window.location.reload(true);
     window.location.replace('pagina-login.html');
 };