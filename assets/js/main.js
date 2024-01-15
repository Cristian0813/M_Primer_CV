(function ($) {
  "use strict";

  // Función para inicializar el portafolio
  function portfolio_init() {
    var portfolio_grid = $("#portfolio_grid");
    var portfolio_filter = $("#portfolio_filters");

    if (portfolio_grid) {
      portfolio_grid.shuffle({ speed: 450, itemSelector: "figure" });

      // Actualizar el portafolio cuando se haga clic en un enlace del menú
      $(".site-main-menu").on("click", "a", function (e) {
        portfolio_grid.shuffle("update");
      });

      // Filtrar el portafolio cuando se haga clic en un filtro
      portfolio_filter.on("click", ".filter", function (e) {
        portfolio_grid.shuffle("update");
        e.preventDefault();
        $("#portfolio_filters .filter").parent().removeClass("active");
        $(this).parent().addClass("active");
        portfolio_grid.shuffle("shuffle", $(this).attr("data-group"));
      });
    }
  }

  // Validación y envío del formulario de contacto
  $(function () {

    $("#contact-form").on("submit", function (e) {
        e.preventDefault();

        var alertPlaceholder = document.getElementById('liveAlertPlaceholder');

        var appendAlert = (message, type) => {
            var wrapper = document.createElement('div');
            var alertDiv = document.createElement('div');

            wrapper.classList.add('alert', `alert-${type}`, 'alert-dismissible');
            alertDiv.innerText = message;
            alertDiv.style.marginBottom = '0';
            wrapper.appendChild(alertDiv);

            var closeBtn = document.createElement('button');
            closeBtn.type = 'button';
            closeBtn.classList.add('btn-close');
            closeBtn.setAttribute('data-bs-dismiss', 'alert');
            closeBtn.setAttribute('aria-label', 'Close');
            wrapper.appendChild(closeBtn);

            alertPlaceholder.innerHTML = '';
            alertPlaceholder.appendChild(wrapper);

            setTimeout(function () {
                wrapper.style.opacity = '0';
                setTimeout(function () {
                    alertPlaceholder.innerHTML = '';
                }, 600); 
            }, 1000);
        };
        var form = document.getElementById('contact-form');
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
        } else {
            form.submit();
        }
    });
});
  // Función para ocultar el menú móvil
  function mobileMenuHide() {
    var windowWidth = $(window).width();
    if (windowWidth < 1024) {
      $("#site_header").addClass("mobile-menu-hide");
    }
  }

  // Función para personalizar el scroll
  function customScroll() {
    var windowWidth = $(window).width();
    if (windowWidth > 991) {
        // Asegúrate de que la biblioteca mCustomScrollbar se haya cargado y sea una función
        if ($.isFunction($.fn.mCustomScrollbar)) {
            $(".pt-page").mCustomScrollbar({ scrollInertia: 8 });
            $("#site_header").mCustomScrollbar({ scrollInertia: 8 });
        } else {
            console.error("mCustomScrollbar not loaded");
        }
    } else {
        // Verifica si mCustomScrollbar existe antes de intentar destruirlo
        if ($.isFunction($.fn.mCustomScrollbar)) {
            $(".pt-page").mCustomScrollbar("destroy");
            $("#site_header").mCustomScrollbar("destroy");
        }
    }
  }
  // Eventos de carga y redimensionamiento de la ventana
  $(window)
    .on("load", function () {
      $(".preloader").fadeOut("slow");
      var ptPage = $(".subpages");
      if (ptPage[0]) {
        PageTransitions.init({ menu: "ul.site-main-menu" });
      }
      customScroll();
    })
    .on("resize", function () {
      mobileMenuHide();
      customScroll();
    });

  // Documento listo
  $(document).ready(function () {
    portfolio_init(); // Inicializar el portafolio
    var $portfolio_container = $("#portfolio_grid");

    // Inicializar hoverdir en elementos del portafolio
    $portfolio_container.imagesLoaded(function () {
      setTimeout(function () {
        portfolio_init();
      }, 500);
    });
    $(" #portfolio_grid > figure > a ").each(function () {
      $(this).hoverdir();
    });
    // Mostrar/ocultar menú móvil
    $(".menu-toggle").on("click", function (event) {
      $("#site_header").toggleClass("mobile-menu-hide");
    });
    // Ocultar menú móvil al hacer clic en un enlace del menú
    $(".site-main-menu").on("click", "a", function (e) {
      mobileMenuHide();
    });
    // Configuración del carrusel de texto
    $(".text-rotation").owlCarousel({
      loop: true,
      dots: false,
      nav: false,
      margin: 10,
      items: 1,
      autoplay: true,
      autoplayHoverPause: false,
      autoplayTimeout: 10000,
      animateOut: "zoomOut",
      animateIn: "zoomIn",
    });
    // Configuración de lightbox
    $(".lightbox").magnificPopup({
      type: "image",
      removalDelay: 300,
      mainClass: "mfp-fade",
      image: { titleSrc: "title", gallery: { enabled: true } },
      iframe: {
        markup:
          '<div class="mfp-iframe-scaler">' +
          '<div class="mfp-close"></div>' +
          '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
          '<div class="mfp-title mfp-bottom-iframe-title"></div>' +
          "</div>",
        patterns: {
          youtube: {
            index: "youtube.com/",
            id: "v=",
            src: "//www.youtube.com/embed/%id%?autoplay=1",
          },
          vimeo: {
            index: "vimeo.com/",
            id: "/",
            src: "//player.vimeo.com/video/%id%?autoplay=1",
          },
          gmaps: { index: "//maps.google.", src: "%id%&output=embed" },
        },
        srcAction: "iframe_src",
      },
      callbacks: {
        markupParse: function (template, values, item) {
          values.title = item.el.attr("title");
        },
      },
    });
    // Carga de páginas a través de AJAX
    $(".ajax-page-load-link").magnificPopup({
      type: "ajax",
      removalDelay: 300,
      mainClass: "mfp-fade",
      gallery: { enabled: true },
    });

    // Efecto de inclinación en elementos
    $(".tilt-effect").tilt({});
  });
})(jQuery);
