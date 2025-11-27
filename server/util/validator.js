import validator from "validator";

// ================================
//   VALIDAR ARTÍCULO
// ================================
export const checkArticle = (params) => {
    let checkTitle =
        !validator.isEmpty(params.titulo) &&
        validator.isLength(params.titulo, { min: 1 });

    let checkContent = !validator.isEmpty(params.genero);

    if (!checkTitle || !checkContent) {
        throw new Error("No se pudo validar la información.");
    }
};

// ================================
//   VALIDAR ID DE ARTÍCULO
// ================================
export const checkIdArticle = (id) => {
    let checkId =
        !validator.isEmpty(id) &&
        validator.isLength(id, { min: 24, max: 24 });

    if (!checkId) {
        throw new Error("Error al validar el ID del artículo.");
    }
};

// ================================
//   VALIDAR USUARIO
// ================================
export const checkUser = (params) => {
    console.log("Validando usuario con datos:", params);

    const checkEmail =
        !validator.isEmpty(params.correo) &&
        validator.isEmail(params.correo) &&
        validator.isLength(params.correo, { min: 5 });

    const checkPass =
        !validator.isEmpty(params.contrasena) &&
        validator.isLength(params.contrasena, { min: 8, max: 14 });


    const checkUsername =
        !validator.isEmpty(params.username) &&
        validator.isLength(params.username, { min: 2 });

    if (!checkEmail || !checkPass) {
        if (!checkEmail) throw new Error("Error al validar el correo electrónico");
        if (!checkPass)
            throw new Error("La contraseña debe tener entre 8 y 14 caracteres");
    }

    const checkName =
        !validator.isEmpty(params.nombre) &&
        validator.isLength(params.nombre, { min: 2 });

    const checkLastName =
        !validator.isEmpty(params.apellido) &&
        validator.isLength(params.apellido, { min: 2 });

    if (!checkName || !checkLastName) {
        throw new Error("Error al validar datos personales del usuario");
    }

    if (!checkUsername) {
        if (!checkUsername)
            throw new Error("El nombre de usuario debe tener al menos 2 caracteres");
    }
};

// ================================
//   VALIDAR ID DE USUARIO
// ================================
export const checkIdUser = (id) => {
    let checkUId =
        !validator.isEmpty(id) &&
        validator.isLength(id, { min: 24, max: 24 });

    if (!checkUId) {
        throw new Error("No fue posible validar la ID del usuario.");
    }
};

// ================================
//   VALIDAR RESERVA
// ================================
export const checkReserva = (params) => {
    if (!params) {
        throw new Error("Faltan datos de reserva.");
    }

    const { cantLibro, userEmail, fechaFinal, estadoReserva } = params;

    const checkCant =
        cantLibro !== undefined &&
        cantLibro !== null &&
        (typeof cantLibro === "number" ||
            (typeof cantLibro === "string" && validator.isInt(cantLibro)));

    const checkEmail =
        userEmail !== undefined &&
        userEmail !== null &&
        validator.isEmail(String(userEmail));

    const checkDateFinal =
        fechaFinal !== undefined &&
        fechaFinal !== null &&
        String(fechaFinal).trim() !== "";

    const checkEstado =
        estadoReserva !== undefined &&
        estadoReserva !== null &&
        String(estadoReserva).trim() !== "";

    if (!checkCant || !checkEmail || !checkDateFinal || !checkEstado) {
        throw new Error(
            "Error al validar la reserva: faltan campos obligatorios o formato inválido."
        );
    }
};