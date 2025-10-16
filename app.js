// Internacionalización (i18n)
let translations = {};
let currentLang = "es";

async function loadLanguage(lang) {
    try {
        const response = await fetch(`languages/${lang}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        translations = await response.json();
        currentLang = lang;
        localStorage.setItem("preferredLang", lang);
        updateUIText();
        updatePreview(); // Re-render preview with new language
    } catch (error) {
        console.error("Could not load language file:", error);
    }
}

function updateUIText() {
    $('[data-translate]').each(function () {
        const key = $(this).data('translate');
        if (translations[key]) {
            $(this).html(translations[key]);
        }
    });

    $('[data-translate-placeholder]').each(function () {
        const key = $(this).data('translate-placeholder');
        if (translations[key]) {
            $(this).attr('placeholder', translations[key]);
        }
    });
}

// Este archivo utiliza librerías globales cargadas a través de etiquetas <script> en index.html
// (jQuery, SweetAlert2, html2canvas, jsPDF)

// Catálogos de habilidades
const technicalSkills = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "PHP",
    "Ruby",
    "Go",
    "Rust",
    "React",
    "Angular",
    "Vue.js",
    "Next.js",
    "Node.js",
    "Express",
    "Django",
    "Flask",
    "Spring Boot",
    "HTML",
    "CSS",
    "Sass",
    "Tailwind CSS",
    "Bootstrap",
    "Material-UI",
    "SQL",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "Firebase",
    "Git",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "Google Cloud",
    "REST API",
    "GraphQL",
    "Microservices",
    "CI/CD",
    "Jest",
    "Cypress",
    "Selenium",
    "JUnit",
    "Figma",
    "Adobe XD",
    "Photoshop",
    "Illustrator",
    "Linux",
    "Bash",
    "PowerShell",
    "Agile",
    "Scrum",
]

const softSkills = [
    "Liderazgo",
    "Comunicación",
    "Trabajo en Equipo",
    "Resolución de Problemas",
    "Pensamiento Crítico",
    "Creatividad",
    "Adaptabilidad",
    "Gestión del Tiempo",
    "Organización",
    "Atención al Detalle",
    "Empatía",
    "Negociación",
    "Toma de Decisiones",
    "Gestión de Proyectos",
    "Mentoría",
    "Presentaciones",
    "Escritura Técnica",
    "Análisis",
    "Innovación",
    "Colaboración",
    "Gestión de Conflictos",
    "Planificación Estratégica",
    "Multitasking",
    "Aprendizaje Continuo",
    "Proactividad",
    "Responsabilidad",
    "Ética Profesional",
    "Inteligencia Emocional",
]

const exampleData = {
    personal: {
        fullName: "Jane Doe",
        position: "Desarrolladora Full-Stack",
        email: "jane.doe@example.com",
        phone: "+1 555-123-4567",
        location: "San Francisco, CA",
        linkedin: "https://linkedin.com/in/janedoe",
        website: "https://janedoe.dev",
        summary: "Desarrolladora Full-Stack con 8 años de experiencia diseñando, desarrollando y manteniendo aplicaciones web complejas. Experta en el stack MERN (MongoDB, Express, React, Node.js) y apasionada por crear interfaces de usuario intuitivas y experiencias de alto rendimiento. Busco activamente oportunidades para resolver problemas desafiantes y colaborar con equipos talentosos.",
    },
    experience: [
        { id: 1, position: "Senior Software Engineer", company: "Tech Solutions Inc.", startDate: "2020-01", endDate: "Presente", description: "Lideré un equipo de 5 ingenieros en el rediseño de la plataforma principal, mejorando el rendimiento en un 40% y la satisfacción del usuario en un 25%. Arquitecté e implementé un sistema de microservicios para el procesamiento de pagos." },
        { id: 2, position: "Frontend Developer", company: "Creative Minds LLC", startDate: "2017-06", endDate: "2019-12", description: "Desarrollé interfaces de usuario interactivas y responsivas para clientes de alto perfil utilizando React y Redux. Colaboré estrechamente con diseñadores de UX/UI para traducir maquetas en código funcional." },
    ],
    education: [
        { id: 1, degree: "Bootcamp de Desarrollo Web Full-Stack", institution: "Lambda School", startDate: "2016-09", endDate: "2017-05" },
        { id: 2, degree: "Grado en Bellas Artes", institution: "Universidad de las Artes", startDate: "2012-08", endDate: "2016-05" },
    ],
    technicalSkills: ["JavaScript (ES6+)", "React", "Node.js", "Express", "MongoDB", "GraphQL", "REST API", "Docker", "Git", "CSS", "HTML", "TypeScript", "Python"],
    softSkills: ["Liderazgo", "Trabajo en Equipo", "Resolución de Problemas", "Comunicación", "Mentoría", "Scrum"],
    languages: [
        { id: 1, name: "Inglés", level: "Nativo" },
        { id: 2, name: "Español", level: "B2 - Intermedio Alto" },
    ],
    certifications: [
        { id: 1, name: "MongoDB Certified Developer", organization: "MongoDB University", date: "2021-05", url: "" },
    ],
    style: "dashboard",
};

// Estado de la aplicación
let cvData = {
    personal: {
        fullName: "",
        position: "",
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        website: "",
        summary: "",
    },
    experience: [],
    education: [],
    technicalSkills: [],
    softSkills: [],
    languages: [],
    certifications: [],
    style: "minimal",
}

let editingState = {
    id: null,
    type: null,
}

function loadExampleData() {
    Swal.fire({
        title: translations.confirm_load_example_title || '¿Cargar datos de ejemplo?',
        text: translations.confirm_load_example_text || "Tus datos actuales no se perderán. Podrás restaurarlos con el botón 'Restaurar mi CV'. ¿Continuar?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#2563eb',
        cancelButtonColor: '#64748b',
        confirmButtonText: translations.confirm_button_yes || 'Sí, cargar',
        cancelButtonText: translations.cancel_button || 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            cvData = JSON.parse(JSON.stringify(exampleData));
            populateForm();
            updatePreview();
            $("#restoreCV").show();
            showSuccess(translations.example_data_loaded || "Datos de ejemplo cargados.");
        }
    });
}

function restoreCV() {
    loadFromLocalStorage();
    saveAndRender();
    $("#restoreCV").hide();
    showSuccess(translations.cv_restored || "Tu CV ha sido restaurado.");
}

// Inicialización
$(document).ready(() => {
    const preferredLang = localStorage.getItem("preferredLang") || "es";
    loadLanguage(preferredLang).then(() => {
        loadFromLocalStorage();
        initializeSkillsGrid();
        setupEventListeners();
        updatePreview();
        updateProgressBar();
    });
})

// Cargar datos del LocalStorage
function loadFromLocalStorage() {
    const savedData = localStorage.getItem("cvData")
    if (savedData) {
        cvData = JSON.parse(savedData)
        populateForm()
    }
}

// Guardar en LocalStorage
function saveToLocalStorage() {
    localStorage.setItem("cvData", JSON.stringify(cvData))
}

// Poblar formulario con datos guardados
function populateForm() {
    // Información personal
    Object.keys(cvData.personal).forEach(key => {
        $(`#${key}`).val(cvData.personal[key]);
    });

    // Estilo
    $(`input[name="cvStyle"][value="${cvData.style}"]`).prop("checked", true)

    // Renderizar listas
    renderAllLists()

    // Actualizar habilidades seleccionadas
    updateSkillsSelection()
}

// Inicializar grid de habilidades
function initializeSkillsGrid() {
    // Habilidades técnicas
    const technicalGrid = $("#technicalSkillsGrid")
    technicalSkills.forEach((skill) => {
        const skillItem = $(`
            <div class="skill-item" data-skill="${skill}" data-type="technical">
                ${skill}
            </div>
        `)
        technicalGrid.append(skillItem)
    })

    // Habilidades blandas
    const softGrid = $("#softSkillsGrid")
    softSkills.forEach((skill) => {
        const skillItem = $(`
            <div class="skill-item" data-skill="${skill}" data-type="soft">
                ${skill}
            </div>
        `)
        softGrid.append(skillItem)
    })

    updateSkillsSelection()
}

// Actualizar selección de habilidades
function updateSkillsSelection() {
    $(".skill-item").removeClass("selected")

    cvData.technicalSkills.forEach((skill) => {
        $(`.skill-item[data-skill="${skill}"][data-type="technical"]`).addClass("selected")
    })

    cvData.softSkills.forEach((skill) => {
        $(`.skill-item[data-skill="${skill}"][data-type="soft"]`).addClass("selected")
    })
}

function setupEventListeners() {
    // Usar delegación de eventos para campos de información personal
    $("#personal").on("input", "input, textarea", function () {
        const field = $(this).attr("id");
        if (cvData.personal.hasOwnProperty(field)) {
            cvData.personal[field] = $(this).val();
            saveToLocalStorage(); // Guardado simple, la preview se actualiza en tiempo real
            updatePreview();
            updateProgressBar();
        }
    });

    // Botones de limpiar campo
    $(".clear-btn").on("click", function () {
        const field = $(this).data("field");
        $(`#${field}`).val("").trigger("input");
    });

    // Estilo de CV
    $('input[name="cvStyle"]').on("change", function () {
        cvData.style = $(this).val();
        saveAndRender();
    });

    // Checkboxes "Actual" para Experiencia y Educación
    $("#expCurrent, #eduCurrent").on("change", function () {
        const isExp = $(this).attr("id") === "expCurrent";
        const target = isExp ? "#expEndDate" : "#eduEndDate";
        $(target).prop("disabled", $(this).is(":checked"));
        if ($(this).is(":checked")) {
            $(target).val("");
        }
    });

    // Botones para agregar elementos a las listas
    $("#addExperience").on("click", addExperience);
    $("#addEducation").on("click", addEducation);
    $("#addLanguage").on("click", addLanguage);
    $("#addCertification").on("click", addCertification);

    // Delegación de eventos para eliminar y editar
    $(document).on("click", ".btn-remove-item", function () {
        const id = parseInt($(this).data("id"), 10);
        const type = $(this).data("type");
        const title = $(this).data("title");
        removeItem(type, id, title);
    });

    $(document).on("click", ".btn-edit-item", function () {
        const id = parseInt($(this).data("id"), 10);
        const type = $(this).data("type");
        editItem(type, id);
    });

    $(document).on("click", ".save-progress-btn", function () {
        saveToLocalStorage();
        showSuccess("¡Tu progreso ha sido guardado!");
    });

    $("#eduDegreeSelect").on("change", function () {
        const selected = $(this).val();
        const degreeInput = $("#eduDegree");
        if (selected === "Otro" || selected === "") {
            degreeInput.val("");
            degreeInput.attr("placeholder", selected === "Otro" ? "Escribe el título completo" : "...Informática");
        } else {
            degreeInput.val(selected + " ");
            degreeInput.focus();
        }
    });

    $("#langNameSelect").on("change", function () {
        if ($(this).val() === "Otro") {
            $("#langNameOtherWrapper").show();
            $("#langName").val("").focus();
        } else {
            $("#langNameOtherWrapper").hide();
            $("#langName").val($(this).val());
        }
    });

    $("#lang-es").on("click", () => loadLanguage("es"));
    $("#lang-en").on("click", () => loadLanguage("en"));


    // Habilidades (click)
    $(document).on("click", ".skill-item", function () {
        const skill = $(this).data("skill");
        const type = $(this).data("type");
        const skillArray = type === "technical" ? "technicalSkills" : "softSkills";

        const index = cvData[skillArray].indexOf(skill);

        if ($(this).hasClass("selected")) {
            if (index > -1) {
                cvData[skillArray].splice(index, 1);
            }
        } else {
            if (index === -1) {
                cvData[skillArray].push(skill);
            }
        }
        $(this).toggleClass("selected");
        saveAndRender();
    });

    // Búsqueda de habilidades (input)
    $("#searchTechnical, #searchSoft").on("input", function () {
        const searchTerm = $(this).val().toLowerCase();
        const gridId = $(this).attr("id") === "searchTechnical" ? "#technicalSkillsGrid" : "#softSkillsGrid";

        $(`${gridId} .skill-item`).each(function () {
            const skillName = $(this).data("skill").toLowerCase();
            $(this).toggle(skillName.includes(searchTerm));
        });
    });

    // Acciones principales
    $("#downloadPDF").on("click", downloadPDF);
    $("#loadExample").on("click", loadExampleData);
    $("#restoreCV").on("click", restoreCV);
    $("#clearAll").on("click", clearAll);

    // Mobile navigation
    $("#mobile-nav-form").on("click", function () {
        $("body").removeClass("view-preview").addClass("view-form");
        $("#mobile-nav-preview").removeClass("active");
        $(this).addClass("active");
    });

    $("#mobile-nav-preview").on("click", function () {
        $("body").removeClass("view-form").addClass("view-preview");
        $("#mobile-nav-form").removeClass("active");
        $(this).addClass("active");
    });
}

// --- Funciones de Ayuda ---

function showSuccess(message) {
    Swal.fire({
        icon: "success",
        title: translations.success_title || "Éxito",
        text: message,
        timer: 1500,
        showConfirmButton: false,
    })
}

function showError(message) {
    Swal.fire({
        icon: "error",
        title: translations.error_title || "Error",
        text: message,
    })
}

function saveAndRender() {
    saveToLocalStorage()
    renderAllLists()
    updatePreview()
    updateProgressBar()
}

function renderAllLists() {
    renderExperienceList()
    renderEducationList()
    renderLanguagesList()
    renderCertificationsList()
}

// --- Edición Genérica ---
function editItem(type, id) {
    const item = cvData[type].find(i => i.id === id);
    if (!item) return;

    editingState = { id, type };

    // Llenar el formulario correspondiente
    switch (type) {
        case 'experience':
            $("#expPosition").val(item.position);
            $("#expCompany").val(item.company);
            $("#expStartDate").val(item.startDate);
            $("#expDescription").val(item.description);
            if (item.endDate === "Presente") {
                $("#expCurrent").prop("checked", true).trigger("change");
                $("#expEndDate").val("");
            } else {
                $("#expCurrent").prop("checked", false).trigger("change");
                $("#expEndDate").val(item.endDate);
            }
            $("#addExperience").html('<i class="fas fa-save"></i> Guardar Cambios').removeClass("btn-primary").addClass("btn-success");
            break;
        case 'education':
            const degree = item.degree;
            $("#eduDegree").val(degree);
            $("#eduInstitution").val(item.institution);
            $("#eduStartDate").val(item.startDate);

            const prefixes = ["Licenciatura en", "Ingeniería en", "Técnico en", "Maestría en", "Doctorado en"];
            let prefixFound = false;
            for (const prefix of prefixes) {
                if (degree.startsWith(prefix)) {
                    $("#eduDegreeSelect").val(prefix);
                    prefixFound = true;
                    break;
                }
            }
            if (!prefixFound && degree) {
                $("#eduDegreeSelect").val("Otro");
            } else if (!degree) {
                $("#eduDegreeSelect").val("");
            }


            if (item.endDate === "Presente") {
                $("#eduCurrent").prop("checked", true).trigger("change");
                $("#expEndDate").val("");
            } else {
                $("#eduCurrent").prop("checked", false).trigger("change");
                $("#eduEndDate").val(item.endDate);
            }
            $("#addEducation").html('<i class="fas fa-save"></i> Guardar Cambios').removeClass("btn-primary").addClass("btn-success");
            break;
        case 'languages':
            const langSelect = $("#langNameSelect");
            const langName = item.name;
            if (langSelect.find(`option[value="${langName}"]`).length > 0) {
                langSelect.val(langName);
                $("#langNameOtherWrapper").hide();
                $("#langName").val(langName);
            } else {
                langSelect.val("Otro");
                $("#langNameOtherWrapper").show();
                $("#langName").val(langName);
            }
            $("#langLevel").val(item.level);
            $("#addLanguage").html('<i class="fas fa-save"></i> Guardar Cambios').removeClass("btn-primary").addClass("btn-success");
            break;
        case 'certifications':
            $("#certName").val(item.name);
            $("#certOrg").val(item.organization);
            $("#certDate").val(item.date);
            $("#certUrl").val(item.url);
            $("#addCertification").html('<i class="fas fa-save"></i> Guardar Cambios').removeClass("btn-primary").addClass("btn-success");
            break;
    }
}

function resetEditingState(type) {
    editingState = { id: null, type: null };
    switch (type) {
        case 'experience':
            $("#expPosition, #expCompany, #expStartDate, #expEndDate, #expDescription").val("");
            $("#expCurrent").prop("checked", false).trigger("change");
            $("#addExperience").html('<i class="fas fa-plus"></i> Agregar Experiencia').removeClass("btn-success").addClass("btn-primary");
            break;
        case 'education':
            $("#eduDegree, #eduInstitution, #eduStartDate, #eduEndDate").val("");
            $("#eduDegreeSelect").val("");
            $("#eduCurrent").prop("checked", false).trigger("change");
            $("#addEducation").html('<i class="fas fa-plus"></i> Agregar Educación').removeClass("btn-success").addClass("btn-primary");
            break;
        case 'languages':
            $("#langName, #langLevel").val("");
            $("#langNameSelect").val("");
            $("#langNameOtherWrapper").hide();
            $("#addLanguage").html('<i class="fas fa-plus"></i> Agregar Idioma').removeClass("btn-success").addClass("btn-primary");
            break;
        case 'certifications':
            $("#certName, #certOrg, #certDate, #certUrl").val("");
            $("#addCertification").html('<i class="fas fa-plus"></i> Agregar Certificación').removeClass("btn-success").addClass("btn-primary");
            break;
    }
}

// --- Experiencia ---

function addExperience() {

    const position = $("#expPosition").val().trim();

    const company = $("#expCompany").val().trim();

    const startDate = $("#expStartDate").val();

    const endDate = $("#expEndDate").val();

    const current = $("#expCurrent").is(":checked");

    const description = $("#expDescription").val().trim();



    if (!position || !company || !startDate) {

        showError(`${translations.error_fields_required || "Por favor completa los campos obligatorios"} (Puesto, Empresa, Fecha Inicio)`);

        return;

    }



    if (!current && !endDate) {

        showError(translations.error_end_date_required || "Por favor indica la fecha de fin o marca como trabajo actual");

        return;

    }



    const newExperience = {

        id: editingState.id && editingState.type === 'experience' ? editingState.id : Date.now(),

        position,

        company,

        startDate,

        endDate: current ? "Presente" : endDate,

        description,

    };



    if (editingState.id && editingState.type === 'experience') {

        // Actualizar

        const index = cvData.experience.findIndex(item => item.id === editingState.id);

        if (index > -1) {

            cvData.experience[index] = newExperience;

            showSuccess(translations.experience_updated || "Experiencia actualizada correctamente");

        }

    } else {

        // Agregar

        cvData.experience.push(newExperience);

        showSuccess(translations.experience_added || "Experiencia agregada correctamente");

    }



    saveAndRender();

    resetEditingState('experience');

}





function renderExperienceList() {





    const list = $("#experienceList")





    list.empty()











    if (cvData.experience.length === 0) {





        list.html(`<p class="text-muted text-center">${translations.no_experience_message || 'No hay experiencias agregadas'}</p>`)





        return





    }











    cvData.experience.forEach((exp) => {





        const item = $(`





            <div class="list-item">





                <div class="list-item-content">





                    <h6>${exp.position}</h6>





                    <p><strong>${exp.company}</strong></p>





                    <p><small>${formatDate(exp.startDate)} - ${exp.endDate === "Presente" ? (translations.cv_present || "Presente") : formatDate(exp.endDate)}</small></p>





                    ${exp.description ? `<p><small>${exp.description}</small></p>` : ""}





                </div>





                <div class="item-actions">





                    <button class="btn btn-outline-primary btn-sm btn-edit-item" data-type="experience" data-id="${exp.id}">





                        <i class="fas fa-pencil-alt"></i>





                    </button>





                    <button class="btn btn-outline-danger btn-sm btn-remove-item" data-type="experience" data-id="${exp.id}" data-title="${translations.item_type_experience || 'Experiencia'}">





                        <i class="fas fa-trash"></i>





                    </button>





                </div>





            </div>





        `)





        list.append(item)





    })





}

// --- Educación ---

function addEducation() {
    const degree = $("#eduDegree").val().trim();
    const institution = $("#eduInstitution").val().trim();
    const startDate = $("#eduStartDate").val();
    const endDate = $("#eduEndDate").val();
    const current = $("#eduCurrent").is(":checked");

    if (!degree || !institution || !startDate) {
        showError(`${translations.error_fields_required || "Por favor completa los campos obligatorios"} (Título, Institución, Fecha Inicio)`);
        return;
    }

    if (!current && !endDate) {
        showError(translations.error_end_date_required || "Por favor indica la fecha de fin o marca como estudiando actualmente");
        return;
    }

    const newEducation = {
        id: editingState.id && editingState.type === 'education' ? editingState.id : Date.now(),
        degree,
        institution,
        startDate,
        endDate: current ? "Presente" : endDate,
    };

    if (editingState.id && editingState.type === 'education') {
        const index = cvData.education.findIndex(item => item.id === editingState.id);
        if (index > -1) {
            cvData.education[index] = newEducation;
            showSuccess(translations.education_updated || "Educación actualizada correctamente");
        }
    } else {
        cvData.education.push(newEducation);
        showSuccess(translations.education_added || "Educación agregada correctamente");
    }

    saveAndRender();
    resetEditingState('education');
}


function renderEducationList() {
    const list = $("#educationList")
    list.empty()

    if (cvData.education.length === 0) {
        list.html(`<p class="text-muted text-center">${translations.no_education_message || 'No hay educación agregada'}</p>`)
        return
    }

    cvData.education.forEach((edu) => {
        const item = $(`
            <div class="list-item">
                <div class="list-item-content">
                    <h6>${edu.degree}</h6>
                    <p><strong>${edu.institution}</strong></p>
                    <p><small>${formatDate(edu.startDate)} - ${edu.endDate === "Presente" ? (translations.cv_present || "Presente") : formatDate(edu.endDate)}</small></p>
                </div>
                <div class="item-actions">
                    <button class="btn btn-outline-primary btn-sm btn-edit-item" data-type="education" data-id="${edu.id}">
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button class="btn btn-outline-danger btn-sm btn-remove-item" data-type="education" data-id="${edu.id}" data-title="${translations.item_type_education || 'Educación'}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `)
        list.append(item)
    })
}

// --- Idiomas ---

function addLanguage() {
    const name = $("#langName").val().trim();
    const level = $("#langLevel").val();

    if (!name || !level) {
        showError(translations.error_fields_required || "Por favor completa todos los campos");
        return;
    }

    const newLanguage = {
        id: editingState.id && editingState.type === 'languages' ? editingState.id : Date.now(),
        name,
        level
    };

    if (editingState.id && editingState.type === 'languages') {
        const index = cvData.languages.findIndex(item => item.id === editingState.id);
        if (index > -1) {
            cvData.languages[index] = newLanguage;
            showSuccess(translations.language_updated || "Idioma actualizado correctamente");
        }
    } else {
        cvData.languages.push(newLanguage);
        showSuccess(translations.language_added || "Idioma agregado correctamente");
    }

    saveAndRender();
    resetEditingState('languages');
}


function renderLanguagesList() {
    const list = $("#languagesList")
    list.empty()

    if (cvData.languages.length === 0) {
        list.html(`<p class="text-muted text-center">${translations.no_languages_message || 'No hay idiomas agregados'}</p>`)
        return
    }

    cvData.languages.forEach((lang) => {
        const item = $(`
            <div class="list-item">
                <div class="list-item-content">
                    <h6>${lang.name}</h6>
                    <p><strong>${translations.cv_level || 'Nivel'}:</strong> ${lang.level}</p>
                </div>
                <div class="item-actions">
                    <button class="btn btn-outline-primary btn-sm btn-edit-item" data-type="languages" data-id="${lang.id}">
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button class="btn btn-outline-danger btn-sm btn-remove-item" data-type="languages" data-id="${lang.id}" data-title="${translations.item_type_language || 'Idioma'}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `)
        list.append(item)
    })
}

// --- Certificaciones ---

function addCertification() {
    const name = $("#certName").val().trim();
    const organization = $("#certOrg").val().trim();
    const date = $("#certDate").val();
    const url = $("#certUrl").val().trim();

    if (!name || !organization || !date) {
        showError(`${translations.error_fields_required || "Por favor completa los campos obligatorios"} (Nombre, Organización, Fecha)`);
        return;
    }

    const newCertification = {
        id: editingState.id && editingState.type === 'certifications' ? editingState.id : Date.now(),
        name,
        organization,
        date,
        url
    };

    if (editingState.id && editingState.type === 'certifications') {
        const index = cvData.certifications.findIndex(item => item.id === editingState.id);
        if (index > -1) {
            cvData.certifications[index] = newCertification;
            showSuccess(translations.certification_updated || "Certificación actualizada correctamente");
        }
    } else {
        cvData.certifications.push(newCertification);
        showSuccess(translations.certification_added || "Certificación agregada correctamente");
    }

    saveAndRender();
    resetEditingState('certifications');
}


function renderCertificationsList() {
    const list = $("#certificationsList")
    list.empty()

    if (cvData.certifications.length === 0) {
        list.html(`<p class="text-muted text-center">${translations.no_certifications_message || 'No hay certificaciones agregadas'}</p>`)
        return
    }

    cvData.certifications.forEach((cert) => {
        const item = $(`
            <div class="list-item">
                <div class="list-item-content">
                    <h6>${cert.name}</h6>
                    <p><strong>${cert.organization}</strong></p>
                    <p><small>${formatDate(cert.date)}</small></p>
                    ${cert.url ? `<p><small><a href="${cert.url}" target="_blank" rel="noopener noreferrer">${translations.cv_view_certificate || 'Ver certificado'}</a></small></p>` : ""}
                </div>
                <div class="item-actions">
                    <button class="btn btn-outline-primary btn-sm btn-edit-item" data-type="certifications" data-id="${cert.id}">
                        <i class="fas fa-pencil-alt"></i>
                    </button>
                    <button class="btn btn-outline-danger btn-sm btn-remove-item" data-type="certifications" data-id="${cert.id}" data-title="${translations.item_type_certification || 'Certificación'}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `)
        list.append(item)
    })
}

// --- Eliminación Genérica ---

function removeItem(type, id, title) {
    Swal.fire({
        title: (translations.confirm_delete_title || "¿Eliminar {item}?").replace("{item}", title),
        text: translations.confirm_delete_text || "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#64748b",
        confirmButtonText: translations.confirm_button_delete || "Sí, eliminar",
        cancelButtonText: translations.cancel_button || "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            cvData[type] = cvData[type].filter((item) => item.id !== id)
            saveAndRender()
            showSuccess((translations.item_deleted || "{item} eliminado/a correctamente").replace("{item}", title))
        }
    })
}

// Actualizar vista previa
function updatePreview() {
    const preview = $("#cvPreview")

    if (cvData.style === "minimal") {
        preview.html(generateMinimalCV())
    } else {
        preview.html(generateDashboardCV())
    }
}

// Generar CV Minimalista
function generateMinimalCV() {
    let html = '<div class="cv-minimal">'

    // Header
    html += '<div class="cv-header">'
    html += `<div class="cv-name">${(cvData.personal.fullName || (translations.cv_your_name || "Tu Nombre")).toUpperCase()}</div>`
    if (cvData.personal.position) {
        html += `<div class="cv-position">${cvData.personal.position}</div>`
    }
    html += '<div class="cv-contact">'
    if (cvData.personal.email)
        html += `<div class="cv-contact-item"><i class="fas fa-envelope"></i> ${cvData.personal.email}</div>`
    if (cvData.personal.phone)
        html += `<div class="cv-contact-item"><i class="fas fa-phone"></i> ${cvData.personal.phone}</div>`
    if (cvData.personal.location)
        html += `<div class="cv-contact-item"><i class="fas fa-map-marker-alt"></i> ${cvData.personal.location}</div>`
    if (cvData.personal.linkedin)
        html += `<div class="cv-contact-item"><i class="fab fa-linkedin"></i> <a href="${cvData.personal.linkedin}" target="_blank" rel="noopener noreferrer">${cvData.personal.linkedin.replace(/^https?:\/\//, '')}</a></div>`
    if (cvData.personal.website)
        html += `<div class="cv-contact-item"><i class="fas fa-globe"></i> <a href="${cvData.personal.website}" target="_blank" rel="noopener noreferrer">${cvData.personal.website.replace(/^https?:\/\//, '')}</a></div>`
    html += "</div></div>"

    // Resumen
    if (cvData.personal.summary) {
        html += '<div class="cv-section">'
        html += `<div class="cv-section-title">${translations.cv_professional_summary || 'Resumen Profesional'}</div>`
        html += `<p>${cvData.personal.summary}</p>`
        html += "</div>"
    }

    // Experiencia
    if (cvData.experience.length > 0) {
        html += '<div class="cv-section">'
        html += `<div class="cv-section-title">${translations.cv_work_experience || 'Experiencia Laboral'}</div>`
        cvData.experience.forEach((exp) => {
            html += '<div class="cv-item">'
            html += '<div class="cv-item-header">'
            html += `<div><div class="cv-item-title">${exp.position}</div><div class="cv-item-subtitle">${exp.company}</div></div>`
            html += `<div class="cv-item-date">${formatDate(exp.startDate)} - ${exp.endDate === "Presente" ? (translations.cv_present || "Presente") : formatDate(exp.endDate)}</div>`
            html += "</div>"
            if (exp.description) html += `<div class="cv-item-description">${exp.description}</div>`
            html += "</div>"
        })
        html += "</div>"
    }

    // Educación
    if (cvData.education.length > 0) {
        html += '<div class="cv-section">'
        html += `<div class="cv-section-title">${translations.cv_education || 'Educación'}</div>`
        cvData.education.forEach((edu) => {
            html += '<div class="cv-item">'
            html += '<div class="cv-item-header">'
            html += `<div><div class="cv-item-title">${edu.degree}</div><div class="cv-item-subtitle">${edu.institution}</div></div>`
            html += `<div class="cv-item-date">${formatDate(edu.startDate)} - ${edu.endDate === "Presente" ? (translations.cv_present || "Presente") : formatDate(edu.endDate)}</div>`
            html += "</div></div>"
        })
        html += "</div>"
    }

    // Habilidades Técnicas
    if (cvData.technicalSkills.length > 0) {
        html += '<div class="cv-section">'
        html += `<div class="cv-section-title">${translations.cv_technical_skills || 'Habilidades Técnicas'}</div>`
        html += '<div class="cv-skills">'
        cvData.technicalSkills.forEach((skill) => {
            html += `<span class="cv-skill-tag">${skill}</span>`
        })
        html += "</div></div>"
    }

    // Habilidades Blandas
    if (cvData.softSkills.length > 0) {
        html += '<div class="cv-section">'
        html += `<div class="cv-section-title">${translations.cv_soft_skills || 'Habilidades Blandas'}</div>`
        html += '<div class="cv-skills">'
        cvData.softSkills.forEach((skill) => {
            html += `<span class="cv-skill-tag">${skill}</span>`
        })
        html += "</div></div>"
    }

    // Idiomas
    if (cvData.languages.length > 0) {
        html += '<div class="cv-section">'
        html += `<div class="cv-section-title">${translations.cv_languages || 'Idiomas'}</div>`
        cvData.languages.forEach((lang) => {
            html += `<div class="cv-item"><strong>${lang.name}:</strong> ${lang.level}</div>`
        })
        html += "</div>"
    }

    // Certificaciones
    if (cvData.certifications.length > 0) {
        html += '<div class="cv-section">'
        html += `<div class="cv-section-title">${translations.cv_certifications || 'Certificaciones'}</div>`
        cvData.certifications.forEach((cert) => {
            html += '<div class="cv-item">'
            html += `<div class="cv-item-title">${cert.name}</div>`
            html += `<div class="cv-item-subtitle">${cert.organization} - ${formatDate(cert.date)}</div>`
            html += "</div>"
        })
        html += "</div>"
    }

    html += "</div>"
    return html
}

// Generar CV Dashboard
function generateDashboardCV() {
    let html = '<div class="cv-dashboard">'

    // Sidebar
    html += '<div class="cv-sidebar">'
    html += `<div class="cv-name">${(cvData.personal.fullName || (translations.cv_your_name || "Tu Nombre")).toUpperCase()}</div>`
    if (cvData.personal.position) {
        html += `<div class="cv-position">${cvData.personal.position}</div>`
    }

    // Contacto
    html += '<div class="cv-contact">'
    if (cvData.personal.email)
        html += `<div class="cv-contact-item"><i class="fas fa-envelope"></i> ${cvData.personal.email}</div>`
    if (cvData.personal.phone)
        html += `<div class="cv-contact-item"><i class="fas fa-phone"></i> ${cvData.personal.phone}</div>`
    if (cvData.personal.location)
        html += `<div class="cv-contact-item"><i class="fas fa-map-marker-alt"></i> ${cvData.personal.location}</div>`
    if (cvData.personal.linkedin)
        html += `<div class="cv-contact-item"><i class="fab fa-linkedin"></i> <a href="${cvData.personal.linkedin}" target="_blank" rel="noopener noreferrer">${cvData.personal.linkedin.replace(/^https?:\/\//, '')}</a></div>`
    if (cvData.personal.website)
        html += `<div class="cv-contact-item"><i class="fas fa-globe"></i> <a href="${cvData.personal.website}" target="_blank" rel="noopener noreferrer">${cvData.personal.website.replace(/^https?:\/\//, '')}</a></div>`
    html += "</div>"

    // Habilidades en sidebar
    if (cvData.technicalSkills.length > 0) {
        html += '<div class="cv-section">'
        html += `<div class="cv-section-title">${translations.cv_technical_skills || 'Habilidades Técnicas'}</div>`
        cvData.technicalSkills.forEach((skill) => {
            html += `<span class="cv-skill-tag">${skill}</span>`
        })
        html += "</div>"
    }

    if (cvData.softSkills.length > 0) {
        html += '<div class="cv-section">'
        html += `<div class="cv-section-title">${translations.cv_soft_skills || 'Habilidades Blandas'}</div>`
        cvData.softSkills.forEach((skill) => {
            html += `<span class="cv-skill-tag">${skill}</span>`
        })
        html += "</div>"
    }

    // Idiomas en sidebar
    if (cvData.languages.length > 0) {
        html += '<div class="cv-section">'
        html += `<div class="cv-section-title">${translations.cv_languages || 'Idiomas'}</div>`
        cvData.languages.forEach((lang) => {
            html += `<div style="margin-bottom: 8px;"><strong>${lang.name}</strong><br><small>${lang.level}</small></div>`
        })
        html += "</div>"
    }

    html += "</div>"

    // Main content
    html += '<div class="cv-main">'

    // Resumen
    if (cvData.personal.summary) {
        html += '<div class="cv-section">'
        html += `<div class="cv-section-title">${translations.cv_professional_summary || 'Resumen Profesional'}</div>`
        html += `<p>${cvData.personal.summary}</p>`
        html += "</div>"
    }

    // Experiencia
    if (cvData.experience.length > 0) {
        html += '<div class="cv-section">'
        html += `<div class="cv-section-title">${translations.cv_work_experience || 'Experiencia Laboral'}</div>`
        cvData.experience.forEach((exp) => {
            html += '<div class="cv-item">'
            html += '<div class="cv-item-header">'
            html += `<div><div class="cv-item-title">${exp.position}</div><div class="cv-item-subtitle">${exp.company}</div></div>`
            html += `<div class="cv-item-date">${formatDate(exp.startDate)} - ${exp.endDate === "Presente" ? (translations.cv_present || "Presente") : formatDate(exp.endDate)}</div>`
            html += "</div>"
            if (exp.description) html += `<div class="cv-item-description">${exp.description}</div>`
            html += "</div>"
        })
        html += "</div>"
    }

    // Educación
    if (cvData.education.length > 0) {
        html += '<div class="cv-section">'
        html += `<div class="cv-section-title">${translations.cv_education || 'Educación'}</div>`
        cvData.education.forEach((edu) => {
            html += '<div class="cv-item">'
            html += '<div class="cv-item-header">'
            html += `<div><div class="cv-item-title">${edu.degree}</div><div class="cv-item-subtitle">${edu.institution}</div></div>`
            html += `<div class="cv-item-date">${formatDate(edu.startDate)} - ${edu.endDate === "Presente" ? (translations.cv_present || "Presente") : formatDate(edu.endDate)}</div>`
            html += "</div></div>"
        })
        html += "</div>"
    }

    // Certificaciones
    if (cvData.certifications.length > 0) {
        html += '<div class="cv-section">'
        html += `<div class="cv-section-title">${translations.cv_certifications || 'Certificaciones'}</div>`
        cvData.certifications.forEach((cert) => {
            html += '<div class="cv-item">'
            html += `<div class="cv-item-title">${cert.name}</div>`
            html += `<div class="cv-item-subtitle">${cert.organization} - ${formatDate(cert.date)}</div>`
            html += "</div>"
        })
        html += "</div>"
    }

    html += "</div></div>"
    return html
}

// Formatear fecha
function formatDate(dateString) {
    if (!dateString || dateString === "Presente") return (dateString === "Presente" ? (translations.cv_present || "Presente") : dateString);
    const [year, month] = dateString.split("-");
    const months = translations.months || ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    return `${months[Number.parseInt(month) - 1]} ${year}`;
}

function updateProgressBar() {
    const criteria = {
        personal: d => d.fullName && d.email && d.phone && d.position,
        summary: d => d.summary && d.summary.length > 20,
        experience: d => d.experience.length > 0,
        education: d => d.education.length > 0,
        technicalSkills: d => d.technicalSkills.length >= 3,
        softSkills: d => d.softSkills.length >= 3,
        languages: d => d.languages.length > 0,
    };

    let score = 0;
    const totalPoints = Object.keys(criteria).length;

    if (criteria.personal(cvData.personal)) score++;
    if (criteria.summary(cvData.personal)) score++;
    if (criteria.experience(cvData)) score++;
    if (criteria.education(cvData)) score++;
    if (criteria.technicalSkills(cvData)) score++;
    if (criteria.softSkills(cvData)) score++;
    if (criteria.languages(cvData)) score++;

    const percentage = Math.round((score / totalPoints) * 100);

    const progressBar = $("#cv-progress-bar");
    progressBar.css("width", `${percentage}%`);
    progressBar.attr("aria-valuenow", percentage);
    progressBar.text(`${percentage}%`);

    const downloadBtn = $("#downloadPDF");
    if (percentage === 100) {
        downloadBtn.prop("disabled", false).removeClass("btn-secondary").addClass("btn-success");
        progressBar.addClass("bg-success");
        downloadBtn.attr("title", translations.cv_ready_to_download_title || "¡Tu CV está listo para descargar!");

    } else {
        downloadBtn.prop("disabled", true).removeClass("btn-success").addClass("btn-secondary");
        progressBar.removeClass("bg-success");
        const remaining = 100 - percentage;
        downloadBtn.attr("title", (translations.complete_cv_to_download_title || "Completa el {percentage}% restante de tu CV para descargar.").replace("{percentage}", remaining));
    }
}

// Descargar PDF
async function downloadPDF() {
    if (!cvData.personal.fullName) {
        showError(translations.error_download_pdf_name || "Por favor completa al menos tu nombre antes de descargar el CV.");
        return;
    }

    const button = $("#downloadPDF");
    const originalText = button.html();
    button.html(`<span class="spinner-border spinner-border-sm me-2"></span>${translations.generating_pdf || 'Generando PDF...'}`).prop("disabled", true);

    const body = $("body");
    const wasInFormView = body.hasClass("view-form");

    // Forzar temporalmente la vista de preview para asegurar que el elemento es visible y renderizado
    if (wasInFormView) {
        body.removeClass("view-form").addClass("view-preview");
    }

    // Pequeña demora para permitir que el navegador renderice la vista previa
    await new Promise(resolve => setTimeout(resolve, 100));

    try {
        const element = document.getElementById("cvPreview");
        const canvas = await html2canvas(element, {
            scale: 3,
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
            windowWidth: element.scrollWidth,
            windowHeight: element.scrollHeight
        });

        const imgData = canvas.toDataURL("image/png", 1.0);
        const pdf = new jspdf.jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
            compress: true
        });

        const margin = 10; // 10mm de margen
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const availableWidth = pdfWidth - (margin * 2);
        const availableHeight = pdfHeight - (margin * 2);

        const canvasAspectRatio = canvas.width / canvas.height;

        let imgWidth = availableWidth;
        let imgHeight = imgWidth / canvasAspectRatio;

        // Si la imagen es más alta que el área disponible, la escala para que quepa
        if (imgHeight > availableHeight) {
            imgHeight = availableHeight;
            imgWidth = imgHeight * canvasAspectRatio;
        }

        const xOffset = margin + (availableWidth - imgWidth) / 2;
        const yOffset = margin + (availableHeight - imgHeight) / 2;

        pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight);

        const fileName = `CV_${cvData.personal.fullName.replace(/\s+/g, "_") || "CV"}.pdf`;
        pdf.save(fileName);

        showSuccess(translations.pdf_downloaded || "Tu CV ha sido descargado correctamente.");

    } catch (error) {
        console.error("Error al generar PDF:", error);
        showError(translations.error_generating_pdf || "Hubo un error al generar el PDF. Inténtalo de nuevo.");
    } finally {
        // Restaurar la vista original si fue cambiada
        if (wasInFormView) {
            body.removeClass("view-preview").addClass("view-form");
        }
        button.html(originalText).prop("disabled", false);
        updateProgressBar();
    }
}

// Limpiar todo
function clearAll() {
    Swal.fire({
        title: translations.confirm_clear_all_title || "¿Estás seguro?",
        text: translations.confirm_clear_all_text || "Se eliminarán todos los datos del CV",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#64748b",
        confirmButtonText: translations.confirm_button_clear_all || "Sí, limpiar todo",
        cancelButtonText: translations.cancel_button || "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            cvData = {
                personal: {
                    fullName: "",
                    position: "",
                    email: "",
                    phone: "",
                    location: "",
                    linkedin: "",
                    website: "",
                    summary: "",
                },
                experience: [],
                education: [],
                technicalSkills: [],
                softSkills: [],
                languages: [],
                certifications: [],
                style: "minimal",
            }

            localStorage.removeItem("cvData")

            // Limpiar formularios
            $(
                'input[type="text"], input[type="email"], input[type="tel"], input[type="url"], input[type="month"], textarea',
            ).val("")
            $('input[type="checkbox"]').prop("checked", false)
            $("select").val("")
            $("#styleMinimal").prop("checked", true)

            // Limpiar listas
            $("#experienceList, #educationList, #languagesList, #certificationsList").empty()

            // Actualizar habilidades
            $(".skill-item").removeClass("selected")

            updatePreview()
            updateProgressBar()

            Swal.fire({
                icon: "success",
                title: translations.all_data_cleared_title || "Limpiado",
                text: translations.all_data_cleared_text || "Todos los datos han sido eliminados",
                timer: 1500,
                showConfirmButton: false,
            })
        }
    })
}
