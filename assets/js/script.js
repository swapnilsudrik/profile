$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
    });

    // <!-- emailjs to mail contact form data -->

    $("#contact-form").submit(function (event) {
        emailjs.init("YIDnL9FUs_ANAr7jZ");

        validateForm();

        event.preventDefault();
    });

    // <!-- emailjs to mail contact form data -->

});

function emailSending (toName, fromName, email, phone, message){

    var serviceID = 'service_apj0msr';
    var templateID= 'template_q0vb1mj';
    var templateParams = {
        to_name: toName,
        from_name: fromName,
        email:email,
        phone:phone,
        message:message
      };
      
      emailjs.send(serviceID, templateID, templateParams).then(
        (response) => {
            document.getElementById("contact-form").reset();
          console.log('SUCCESS!', response.status, response.text);
          Swal.fire({
            title: "Message Sent..!",
            html: "Your message was successfully sent! 🎉 We'll get back to you as soon as possible.",
            icon: "success",
            confirmButtonText: "Okay",
          });
        },
        (error) => {
          console.log('FAILED...', error);
          Swal.fire({
            title: "Message Not Sent..!",
            html: "Oops! Something went wrong. 😞 Please check your information and try submitting the form again. If the issue persists, contact our support team.",
            icon: "error",
            confirmButtonText: "Okay",
          });
        },
      );
}


function validateForm() {
    var toName='Swapnil';
    var name=$('#name').val();
    var email=$('#email').val();
    var phone=$('#phone').val();
    var message=$('#message').val();

    // Clear previous error messages
    document.getElementById('nameError').innerHTML = '';
    document.getElementById('emailError').innerHTML = '';
    document.getElementById('phoneError').innerHTML = '';
    document.getElementById('messageError').innerHTML = '';

    // Basic validation for name (non-empty)
    if (name.trim() === '') {
        document.getElementById('nameError').innerHTML = 'Please enter your name.';
        return false;
    }

    // Basic validation for email format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').innerHTML = 'Please enter a valid email address.';
        return false;
    }

    // Basic validation for phone (numeric and non-empty)
    var phoneRegex = /^\d+$/;
    if (!phoneRegex.test(phone) || phone.trim() === '') {
        document.getElementById('phoneError').innerHTML = 'Please enter a valid phone number.';
        return false;
    }

    // Basic validation for message (non-empty)
    if (message.trim() === '') {
        document.getElementById('messageError').innerHTML = 'Please enter your message.';
        return false;
    }

    // If all validations pass, the form can be submitted
    // alert('Form submitted successfully!');
    emailSending(toName, name, email, phone, message);
    return true;
}


document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Swapnil Sudrik | Full-Stack Developer | Java Developer | MERN Stack Developer | Freelancer";
            $("#favicon").attr("href", "assets/images/favicon.ico");
        }
        else {
            document.title = "Come Back To Portfolio | Swapnil Sudrik | Full-Stack Developer | Java Developer | MERN Stack Developer | Freelancer";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["Java Development","Full Stack Development","MERN Stack Development","frontend development", "backend development", "web designing", "web development"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function projectAlert(pname) {
    Swal.fire({
      title: "Project Status",
      html: `${pname} is currently under development.<br>Thank you for your interest!<br>Please check back later.`,
      icon: "info",
      confirmButtonText: "Okay, got it!",
    });
  }

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.forEach(project => {
        if(project.links.view === ""){
            console.log("in view");
        }
        else{
            console.log(project.links.code)
        }

        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="./assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">

          ${project.links.view === "" ? `<a onclick="projectAlert('${project.name}')" style="cursor: pointer;" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>` : `<a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>`}

            <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
          </div>

        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
    });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// disable developer mode
document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
}

/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .telegram', { interval: 600 });
srtop.reveal('.home .instagram', { interval: 600 });
srtop.reveal('.home .dev', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });