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

function loadExampleData() {
    Swal.fire({
        title: '¿Cargar datos de ejemplo?',
        text: "Esto reemplazará tus datos actuales. ¿Continuar?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#2563eb',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Sí, cargar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            cvData = JSON.parse(JSON.stringify(exampleData));
            populateForm();
            saveAndRender();
            showSuccess("Datos de ejemplo cargados.");
        }
    });
}

// Inicialización
$(document).ready(() => {
    loadFromLocalStorage()
    initializeSkillsGrid()
    setupEventListeners()
    updatePreview()
    updateProgressBar()
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

    // Delegación de eventos para eliminar elementos de las listas
    $(document).on("click", ".btn-remove-item", function () {
        const id = parseInt($(this).data("id"), 10);
        const type = $(this).data("type");
        const title = $(this).data("title");
        removeItem(type, id, title);
    });

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
    $("#clearAll").on("click", clearAll);

    // Mobile navigation
    $("#mobile-nav-form").on("click", function() {
        $("body").removeClass("view-preview").addClass("view-form");
        $("#mobile-nav-preview").removeClass("active");
        $(this).addClass("active");
    });

    $("#mobile-nav-preview").on("click", function() {
        $("body").removeClass("view-form").addClass("view-preview");
        $("#mobile-nav-form").removeClass("active");
        $(this).addClass("active");
    });
}

// --- Funciones de Ayuda ---

function showSuccess(message) {
    Swal.fire({
        icon: "success",
        title: "Éxito",
        text: message,
        timer: 1500,
        showConfirmButton: false,
    })
}

function showError(message) {
    Swal.fire({
        icon: "error",
        title: "Error",
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

// --- Experiencia ---

function addExperience() {
    const position = $("#expPosition").val().trim()
    const company = $("#expCompany").val().trim()
    const startDate = $("#expStartDate").val()
    const endDate = $("#expEndDate").val()
    const current = $("#expCurrent").is(":checked")
    const description = $("#expDescription").val().trim()

    if (!position || !company || !startDate) {
        showError("Por favor completa los campos obligatorios (Puesto, Empresa, Fecha Inicio)")
        return
    }

    if (!current && !endDate) {
        showError("Por favor indica la fecha de fin o marca como trabajo actual")
        return
    }

    cvData.experience.push({
        id: Date.now(),
        position,
        company,
        startDate,
        endDate: current ? "Presente" : endDate,
        description,
    })

    saveAndRender()
    $("#expPosition, #expCompany, #expStartDate, #expEndDate, #expDescription").val("")
    $("#expCurrent").prop("checked", false).trigger("change")
    showSuccess("Experiencia agregada correctamente")
}

function renderExperienceList() {
    const list = $("#experienceList")
    list.empty()

    if (cvData.experience.length === 0) {
        list.html('<p class="text-muted text-center">No hay experiencias agregadas</p>')
        return
    }

    cvData.experience.forEach((exp) => {
        const item = $(`
            <div class="list-item">
                <button class="btn btn-danger btn-sm btn-remove-item" data-type="experience" data-id="${exp.id}" data-title="Experiencia">
                    <i class="fas fa-trash"></i>
                </button>
                <h6>${exp.position}</h6>
                <p><strong>${exp.company}</strong></p>
                <p><small>${formatDate(exp.startDate)} - ${exp.endDate === "Presente" ? "Presente" : formatDate(exp.endDate)}</small></p>
                ${exp.description ? `<p><small>${exp.description}</small></p>` : ""}
            </div>
        `)
        list.append(item)
    })
}

// --- Educación ---

function addEducation() {
    const degree = $("#eduDegree").val().trim()
    const institution = $("#eduInstitution").val().trim()
    const startDate = $("#eduStartDate").val()
    const endDate = $("#eduEndDate").val()
    const current = $("#eduCurrent").is(":checked")

    if (!degree || !institution || !startDate) {
        showError("Por favor completa los campos obligatorios (Título, Institución, Fecha Inicio)")
        return
    }

    if (!current && !endDate) {
        showError("Por favor indica la fecha de fin o marca como estudiando actualmente")
        return
    }

    cvData.education.push({
        id: Date.now(),
        degree,
        institution,
        startDate,
        endDate: current ? "Presente" : endDate,
    })

    saveAndRender()
    $("#eduDegree, #eduInstitution, #eduStartDate, #eduEndDate").val("")
    $("#eduCurrent").prop("checked", false).trigger("change")
    showSuccess("Educación agregada correctamente")
}

function renderEducationList() {
    const list = $("#educationList")
    list.empty()

    if (cvData.education.length === 0) {
        list.html('<p class="text-muted text-center">No hay educación agregada</p>')
        return
    }

    cvData.education.forEach((edu) => {
        const item = $(`
            <div class="list-item">
                <button class="btn btn-danger btn-sm btn-remove-item" data-type="education" data-id="${edu.id}" data-title="Educación">
                    <i class="fas fa-trash"></i>
                </button>
                <h6>${edu.degree}</h6>
                <p><strong>${edu.institution}</strong></p>
                <p><small>${formatDate(edu.startDate)} - ${edu.endDate === "Presente" ? "Presente" : formatDate(edu.endDate)}</small></p>
            </div>
        `)
        list.append(item)
    })
}

// --- Idiomas ---

function addLanguage() {
    const name = $("#langName").val().trim()
    const level = $("#langLevel").val()

    if (!name || !level) {
        showError("Por favor completa todos los campos")
        return
    }

    cvData.languages.push({ id: Date.now(), name, level })
    saveAndRender()
    $("#langName, #langLevel").val("")
    showSuccess("Idioma agregado correctamente")
}

function renderLanguagesList() {
    const list = $("#languagesList")
    list.empty()

    if (cvData.languages.length === 0) {
        list.html('<p class="text-muted text-center">No hay idiomas agregados</p>')
        return
    }

    cvData.languages.forEach((lang) => {
        const item = $(`
            <div class="list-item">
                <button class="btn btn-danger btn-sm btn-remove-item" data-type="languages" data-id="${lang.id}" data-title="Idioma">
                    <i class="fas fa-trash"></i>
                </button>
                <h6>${lang.name}</h6>
                <p><strong>Nivel:</strong> ${lang.level}</p>
            </div>
        `)
        list.append(item)
    })
}

// --- Certificaciones ---

function addCertification() {
    const name = $("#certName").val().trim()
    const organization = $("#certOrg").val().trim()
    const date = $("#certDate").val()
    const url = $("#certUrl").val().trim()

    if (!name || !organization || !date) {
        showError("Por favor completa los campos obligatorios (Nombre, Organización, Fecha)")
        return
    }

    cvData.certifications.push({ id: Date.now(), name, organization, date, url })
    saveAndRender()
    $("#certName, #certOrg, #certDate, #certUrl").val("")
    showSuccess("Certificación agregada correctamente")
}

function renderCertificationsList() {
    const list = $("#certificationsList")
    list.empty()

    if (cvData.certifications.length === 0) {
        list.html('<p class="text-muted text-center">No hay certificaciones agregadas</p>')
        return
    }

    cvData.certifications.forEach((cert) => {
        const item = $(`
            <div class="list-item">
                <button class="btn btn-danger btn-sm btn-remove-item" data-type="certifications" data-id="${cert.id}" data-title="Certificación">
                    <i class="fas fa-trash"></i>
                </button>
                <h6>${cert.name}</h6>
                <p><strong>${cert.organization}</strong></p>
                <p><small>${formatDate(cert.date)}</small></p>
                ${cert.url ? `<p><small><a href="${cert.url}" target="_blank" rel="noopener noreferrer">Ver certificado</a></small></p>` : ""}
            </div>
        `)
        list.append(item)
    })
}

// --- Eliminación Genérica ---

function removeItem(type, id, title) {
    Swal.fire({
        title: `¿Eliminar ${title}?`,
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            cvData[type] = cvData[type].filter((item) => item.id !== id)
            saveAndRender()
            showSuccess(`${title} eliminado/a correctamente`)
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
    html += `<div class="cv-name">${(cvData.personal.fullName || "Tu Nombre").toUpperCase()}</div>`
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
        html += '<div class="cv-section-title">Resumen Profesional</div>'
        html += `<p>${cvData.personal.summary}</p>`
        html += "</div>"
    }

    // Experiencia
    if (cvData.experience.length > 0) {
        html += '<div class="cv-section">'
        html += '<div class="cv-section-title">Experiencia Laboral</div>'
        cvData.experience.forEach((exp) => {
            html += '<div class="cv-item">'
            html += '<div class="cv-item-header">'
            html += `<div><div class="cv-item-title">${exp.position}</div><div class="cv-item-subtitle">${exp.company}</div></div>`
            html += `<div class="cv-item-date">${formatDate(exp.startDate)} - ${exp.endDate === "Presente" ? "Presente" : formatDate(exp.endDate)}</div>`
            html += "</div>"
            if (exp.description) html += `<div class="cv-item-description">${exp.description}</div>`
            html += "</div>"
        })
        html += "</div>"
    }

    // Educación
    if (cvData.education.length > 0) {
        html += '<div class="cv-section">'
        html += '<div class="cv-section-title">Educación</div>'
        cvData.education.forEach((edu) => {
            html += '<div class="cv-item">'
            html += '<div class="cv-item-header">'
            html += `<div><div class="cv-item-title">${edu.degree}</div><div class="cv-item-subtitle">${edu.institution}</div></div>`
            html += `<div class="cv-item-date">${formatDate(edu.startDate)} - ${edu.endDate === "Presente" ? "Presente" : formatDate(edu.endDate)}</div>`
            html += "</div></div>"
        })
        html += "</div>"
    }

    // Habilidades Técnicas
    if (cvData.technicalSkills.length > 0) {
        html += '<div class="cv-section">'
        html += '<div class="cv-section-title">Habilidades Técnicas</div>'
        html += '<div class="cv-skills">'
        cvData.technicalSkills.forEach((skill) => {
            html += `<span class="cv-skill-tag">${skill}</span>`
        })
        html += "</div></div>"
    }

    // Habilidades Blandas
    if (cvData.softSkills.length > 0) {
        html += '<div class="cv-section">'
        html += '<div class="cv-section-title">Habilidades Blandas</div>'
        html += '<div class="cv-skills">'
        cvData.softSkills.forEach((skill) => {
            html += `<span class="cv-skill-tag">${skill}</span>`
        })
        html += "</div></div>"
    }

    // Idiomas
    if (cvData.languages.length > 0) {
        html += '<div class="cv-section">'
        html += '<div class="cv-section-title">Idiomas</div>'
        cvData.languages.forEach((lang) => {
            html += `<div class="cv-item"><strong>${lang.name}:</strong> ${lang.level}</div>`
        })
        html += "</div>"
    }

    // Certificaciones
    if (cvData.certifications.length > 0) {
        html += '<div class="cv-section">'
        html += '<div class="cv-section-title">Certificaciones</div>'
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
    html += `<div class="cv-name">${(cvData.personal.fullName || "Tu Nombre").toUpperCase()}</div>`
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
        html += '<div class="cv-section-title">Habilidades Técnicas</div>'
        cvData.technicalSkills.forEach((skill) => {
            html += `<span class="cv-skill-tag">${skill}</span>`
        })
        html += "</div>"
    }

    if (cvData.softSkills.length > 0) {
        html += '<div class="cv-section">'
        html += '<div class="cv-section-title">Habilidades Blandas</div>'
        cvData.softSkills.forEach((skill) => {
            html += `<span class="cv-skill-tag">${skill}</span>`
        })
        html += "</div>"
    }

    // Idiomas en sidebar
    if (cvData.languages.length > 0) {
        html += '<div class="cv-section">'
        html += '<div class="cv-section-title">Idiomas</div>'
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
        html += '<div class="cv-section-title">Resumen Profesional</div>'
        html += `<p>${cvData.personal.summary}</p>`
        html += "</div>"
    }

    // Experiencia
    if (cvData.experience.length > 0) {
        html += '<div class="cv-section">'
        html += '<div class="cv-section-title">Experiencia Laboral</div>'
        cvData.experience.forEach((exp) => {
            html += '<div class="cv-item">'
            html += '<div class="cv-item-header">'
            html += `<div><div class="cv-item-title">${exp.position}</div><div class="cv-item-subtitle">${exp.company}</div></div>`
            html += `<div class="cv-item-date">${formatDate(exp.startDate)} - ${exp.endDate === "Presente" ? "Presente" : formatDate(exp.endDate)}</div>`
            html += "</div>"
            if (exp.description) html += `<div class="cv-item-description">${exp.description}</div>`
            html += "</div>"
        })
        html += "</div>"
    }

    // Educación
    if (cvData.education.length > 0) {
        html += '<div class="cv-section">'
        html += '<div class="cv-section-title">Educación</div>'
        cvData.education.forEach((edu) => {
            html += '<div class="cv-item">'
            html += '<div class="cv-item-header">'
            html += `<div><div class="cv-item-title">${edu.degree}</div><div class="cv-item-subtitle">${edu.institution}</div></div>`
            html += `<div class="cv-item-date">${formatDate(edu.startDate)} - ${edu.endDate === "Presente" ? "Presente" : formatDate(edu.endDate)}</div>`
            html += "</div></div>"
        })
        html += "</div>"
    }

    // Certificaciones
    if (cvData.certifications.length > 0) {
        html += '<div class="cv-section">'
        html += '<div class="cv-section-title">Certificaciones</div>'
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
    if (!dateString || dateString === "Presente") return dateString
    const [year, month] = dateString.split("-")
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
    return `${months[Number.parseInt(month) - 1]} ${year}`
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
        downloadBtn.attr("title", "¡Tu CV está listo para descargar!");

    } else {
        downloadBtn.prop("disabled", true).removeClass("btn-success").addClass("btn-secondary");
        progressBar.removeClass("bg-success");
        downloadBtn.attr("title", `Completa el ${100 - percentage}% restante de tu CV para descargar.`);
    }
}

// Descargar PDF
async function downloadPDF() {
    if (!cvData.personal.fullName) {
        showError("Por favor completa al menos tu nombre antes de descargar el CV.");
        return;
    }

    const button = $("#downloadPDF");
    const originalText = button.html();
    button.html('<span class="spinner-border spinner-border-sm me-2"></span>Generando PDF...').prop("disabled", true);

    try {
        const element = document.getElementById("cvPreview");
        
        element.style.display = 'none';
        element.offsetHeight; // no-op
        element.style.display = '';

        const canvas = await html2canvas(element, {
            scale: 3, 
            useCORS: true,
            logging: false,
            backgroundColor: "#ffffff",
            scrollX: -window.scrollX,
            scrollY: -window.scrollY,
            windowWidth: document.documentElement.offsetWidth,
            windowHeight: document.documentElement.offsetHeight
        });

        const imgData = canvas.toDataURL("image/png", 1.0);
        const pdf = new jspdf.jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
            compress: true
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        
        const imgWidth = pdfWidth;
        const imgHeight = imgWidth / ratio;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        const fileName = `CV_${cvData.personal.fullName.replace(/\s+/g, "_") || "CV"}.pdf`;
        pdf.save(fileName);

        showSuccess("Tu CV ha sido descargado correctamente.");

    } catch (error) {
        console.error("Error al generar PDF:", error);
        showError("Hubo un error al generar el PDF. Inténtalo de nuevo.");
    } finally {
        button.html(originalText).prop("disabled", false);
    }
}

// Limpiar todo
function clearAll() {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Se eliminarán todos los datos del CV",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#64748b",
        confirmButtonText: "Sí, limpiar todo",
        cancelButtonText: "Cancelar",
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
                title: "Limpiado",
                text: "Todos los datos han sido eliminados",
                timer: 1500,
                showConfirmButton: false,
            })
        }
    })
}
