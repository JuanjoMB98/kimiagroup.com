/*----------------------------------- Actualizar altura form para animacion --*/
function updateFormHeight() {
    $(".js-collapsableContent").css(
        "max-height",
        $(".js-collapsableContent").prop("scrollHeight") + "px"
    );
}
/*----------------------------------- Actualizar altura form para animacion --*/
function destacarForm() {
    //Botón de enviar contenido
    $("body").on("click", ".a-button.-primary", function () {
        setTimeout(function () {
            $(".js-form").addClass("-blink");
        }, 1000);

        setTimeout(function () {
            $(".js-form").removeClass("-blink");
        }, 3000);
    });
}

/*-------------------------------------------------------------- add minify --*/
function addMinifyClassOnScroll(elementId) {
    var element = $(elementId);

    $(window).scroll(function () {
        // Obtenemos la posición actual de desplazamiento
        var scroll = $(window).scrollTop();

        // Cambiar la clase del encabezado cuando el usuario hace scroll
        if (scroll > 0) {
            element.addClass("-minify");
        } else {
            element.removeClass("-minify");
        }
    });
}

/*------------------------------------------------------ desplegar elemento --*/
function toggleCollapsable() {
    updateFormHeight();

    $(".js-collapsableButton").on("click", function () {
        $(this).toggleClass("-active");

        var $content = $(this).next();
        if ($content.css("max-height") !== "0px") {
            $content.css("max-height", "0px");
            $content.css("padding", "0px");
        } else {
            $content.css("max-height", $content.prop("scrollHeight") + "px");
        }
    });
}

/*-------------------------------------------------- Guardar datos del Form --*/
function saveData() {
    $(".js-submitButton").on("click", function () {
        var formData = {};

        // Capturar datos de los campos de entrada
        $(".m-heroForm__content input").each(function () {
            var fieldName = $(this).attr("name");
            var fieldValue = $(this).val();
            formData[fieldName] = fieldValue;
        });

        // Capturar datos de los elementos de radio
        var radioValue = $('input[name="instalarSolares"]:checked').val();
        formData["instalarSolares"] = radioValue;

        // Mostrar los datos en un alert
        alert(JSON.stringify(formData, null, 2));
    });
}

/*------------------------------------------------------ desplegar elemento --*/

function formFuncionality() {
    var $formSteps = $(".js-formStep");
    var $prevBtn = $(".js-prevButton");

    var currentStep = 1;
    var totalSteps = $formSteps.length;

    // Mostramos el paso 1
    $formSteps.eq(currentStep - 1).css("display", "flex");
    updateFormHeight();

    // Ocultamos boton anterior
    $prevBtn.css("opacity", currentStep == 1 ? "0" : "1");

    // Botón para avanzar al siguiente paso
    $("body").on("click", ".js-nextButton", function () {
        // Valida el formulario en el paso actual
        var isValid = validateStep(currentStep);

        if (isValid) {
            // Oculta el paso actual
            $formSteps.eq(currentStep - 1).hide();

            currentStep++;
            updateProgress();
        }
    });

    // Botón para retroceder al paso anterior
    $("body").on("click", ".js-prevButton", function () {
        if (currentStep > 1) {
            // Oculta el paso actual
            $formSteps.eq(currentStep - 1).hide();

            currentStep--;
            updateProgress();
        }
    });

    //Botón de enviar contenido
    $("body").on("click", ".js-submitButton", function () {
        // console.log("entra")
        $(".-invalid").removeClass("-invalid");
        sendData();
    });

    //Limpiar -invalid
    $("body").on("click", ".js-inputItem", function () {
        $(".-invalid").removeClass("-invalid");
    });

    function validateStep(step) {
        if (step === 1) {
            // Validación del Paso 1 (radio inputs)
            var radioSelected =
                $("input[name='instalarSolares']:checked").length > 0;
            if (!radioSelected) {
                $(".js-inputItem").addClass("-invalid");
                // alert("Por favor, seleccione un tipo de instalación.");
                return false;
            } else {
                $(".js-inputItem").removeClass("-invalid");
            }
        } else if (step === 2) {
            // Validación del Paso 2 (campos de entrada)
            var name = $("#name").val();
            var surname = $("#surname").val();
            var email = $("#email").val();
            var phone = $("#phone").val();
            var privacidadChecked = $("#privacidad").is(":checked");

            // Verifica cada campo y agrega la clase -invalid si no es válido
            if (!name) {
                $(" .js-inputItem #name").addClass("-invalid");
            } else {
                $(" .js-inputItem #name").removeClass("-invalid");
            }

            if (!surname) {
                $(" .js-inputItem #surname").addClass("-invalid");
            } else {
                $(" .js-inputItem #surname").removeClass("-invalid");
            }

            if (!email) {
                $(" .js-inputItem #email").addClass("-invalid");
            } else {
                $(" .js-inputItem #email").removeClass("-invalid");
            }

            if (!phone) {
                $(" .js-inputItem #phone").addClass("-invalid");
            } else {
                $(" .js-inputItem #phone").removeClass("-invalid");
            }

            if (!privacidadChecked) {
                $(" .js-inputItem #privacidad").addClass("-invalid");
            } else {
                $(" .js-inputItem #privacidad").removeClass("-invalid");
            }

            if (!(name && surname && email && phone && privacidadChecked)) {
                alert(
                    "Venga va... rellena los campos y acepta los terminos, que es un momento."
                );
                // Puedes mostrar un mensaje de error adicional si lo deseas
                return false;
            }
            if (email) {
                if (!isValidEmail(email)) {
                    alert("Pon un correo de verdad, no te hagas el remolón.");
                    return false;
                }
            }
        }

        return true;

        function isValidEmail(email) {
            // Expresión regular para validar una dirección de correo electrónico
            var emailPattern =
                /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailPattern.test(email);
        }
    }

    // Función para actualizar la barra de progreso

    //Limpiar -invalid
    $("body").on("change", "input[name='instalarSolares']", function () {
        $(".js-progressBar").css("width", "50%");
    });

    function updateProgress() {
        $formSteps.eq(currentStep - 1).css("display", "flex");

        if (currentStep >= totalSteps) {
            $(".js-nextButton").find("span").text("Enviar datos");
            $(".js-nextButton").find("img").hide();
            $(".js-nextButton")
                .addClass("js-submitButton")
                .addClass("-send")
                .removeClass("js-nextButton");

            $(".js-progressBar").css("width", "100%");
        } else {
            $(".js-submitButton").find("span").text("Siguiente");
            $(".js-submitButton").find("img").show();
            $(".js-submitButton")
                .removeClass("js-submitButton")
                .removeClass("-send")
                .addClass("js-nextButton");
            $(".js-progressBar").css("width", "50%");
        }

        // Ocultamos boton anterior
        $prevBtn.css("opacity", currentStep == 1 ? "0" : "1");
        updateFormHeight();

        $(".js-progressStepActual").text(currentStep);
    }

    function sendData() {
        var isValid = validateStep(2);

        if (isValid) {
            // Crear un objeto para almacenar los datos del formulario
            var formData = {};

            // Capturar datos de los campos de entrada
            $(".m-heroForm__content input").each(function () {
                var fieldName = $(this).attr("name");
                var fieldValue = $(this).val();
                formData[fieldName] = fieldValue;
            });

            // Capturar datos de los elementos de radio
            var radioValue = $('input[name="instalarSolares"]:checked').val();
            formData["instalarSolares"] = radioValue;

            // Mostrar los datos en un alert
            alert(JSON.stringify(formData, null, 2));
        }
    }
}

/*------------------------------------------------------- arrastre carrusel --*/
function setupDraggableCarrusel() {
    $(".m-testimonials__content").each(function () {
        var carrusel = $(this);
        let isDragging = false,
            startX,
            startScrollLeft;

        const dragStart = (e) => {
            isDragging = true;
            carrusel.addClass("-dragging");
            startX = e.pageX;
            startScrollLeft = carrusel.scrollLeft();
        };

        const dragStop = () => {
            isDragging = false;
            carrusel.removeClass("-dragging");
        };

        const dragging = (e) => {
            if (!isDragging) return;
            carrusel.scrollLeft(startScrollLeft - (e.pageX - startX));
        };

        carrusel.on("mousedown", dragStart);
        carrusel.on("mousemove", dragging);
        $("body").on("mouseup", dragStop);
    });
}
/*--------------------------------------------------------- button carrusel --*/
function setupClickBtnCarrusel() {
    $(".o-testimonialsSection").each(function () {
        var carrusel = $(this).find(".m-testimonials__content");
        const arrowBtns = $(this).find(".a-carruselController");
        const leftButton = $(this).find(".a-carruselController#left");
        const rightButton = $(this).find(".a-carruselController#right");

        const firstCardWidth = carrusel
            .find(".m-testimonial__item")
            .first()
            .outerWidth(true);

        arrowBtns.each(function () {
            const btn = $(this);
            btn.click(function () {
                carrusel.scrollLeft(
                    carrusel.scrollLeft() +
                        (btn.attr("id") === "left"
                            ? -firstCardWidth
                            : firstCardWidth)
                );
                infinityScroll();
            });
        });

        const infinityScroll = () => {
            //console.log(carrusel.scrollLeft());
            const scrollLeft = carrusel.scrollLeft();
        };
    });
}

$(document).ready(function () {
    //Añadimos la clase minify al header
    addMinifyClassOnScroll(".o-mainHeader");

    //Funcionalidad de desplegar el formulario
    toggleCollapsable();

    //Funcionalidad del formulario
    formFuncionality();

    //Destacar Form
    destacarForm();

    //Carrusel
    setupDraggableCarrusel();
    setupClickBtnCarrusel();
});
