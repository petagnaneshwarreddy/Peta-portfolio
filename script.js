$(document).ready(function(){
    // Sticky Navbar on Scroll
    $(window).scroll(function(){
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }
        
        // Scroll-up button show/hide
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // Scroll-up button click
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0}, 800);
        $('html').css("scrollBehavior", "auto");
    });

    // Smooth scroll on menu items click
    $('.navbar .menu li a').click(function(){
        $('html').css("scrollBehavior", "smooth");
    });

    // Toggle menu/navbar
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("fa-times");
    });

    // Close menu when clicking on a menu item (mobile)
    $('.navbar .menu li a').click(function(){
        $('.navbar .menu').removeClass("active");
        $('.menu-btn i').removeClass("fa-times");
    });

    // Typing animation
    if($(".typing").length) {
        var typed1 = new Typed(".typing", {
            strings: ["Full Stack Developer", "Java Developer", "Front-end Developer", "UI/UX Designer", "Problem Solver"],
            typeSpeed: 80,
            backSpeed: 50,
            loop: true,
            backDelay: 1500
        });
    }

    if($(".typing-2").length) {
        var typed2 = new Typed(".typing-2", {
            strings: ["Full Stack Developer", "Java Developer", "Front-end Developer", "UI/UX Designer", "Problem Solver"],
            typeSpeed: 80,
            backSpeed: 50,
            loop: true,
            backDelay: 1500
        });
    }

    // Animate sections on scroll
    function animateOnScroll() {
        $('.about, .services, .skills, .projects, .contact').each(function(){
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if(elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate-in');
            }
        });
    }

    $(window).on('scroll', animateOnScroll);
    animateOnScroll(); // Run on page load

    // Smooth scroll for all anchor links
    $('a[href*="#"]').on('click', function(e) {
        var target = $(this.hash);
        if(target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800);
        }
    });

    // Skill bars animation
    function animateSkillBars() {
        $('.skill-progress').each(function(){
            var elementTop = $(this).offset().top;
            var elementBottom = elementTop + $(this).outerHeight();
            var viewportTop = $(window).scrollTop();
            var viewportBottom = viewportTop + $(window).height();
            
            if(elementBottom > viewportTop && elementTop < viewportBottom) {
                if(!$(this).hasClass('animated')) {
                    $(this).addClass('animated');
                    var width = $(this).css('width');
                    $(this).css('width', '0');
                    $(this).animate({
                        width: width
                    }, 1500);
                }
            }
        });
    }

    $(window).on('scroll', animateSkillBars);
    animateSkillBars(); // Run on page load

    // Form submission
    $('#contact-form').on('submit', function(e){
        e.preventDefault();
        
        // Get form values
        var name = $(this).find('input[type="text"]').eq(0).val();
        var email = $(this).find('input[type="email"]').val();
        var subject = $(this).find('input[type="text"]').eq(1).val();
        var message = $(this).find('textarea').val();
        
        // Basic validation
        if(name && email && subject && message) {
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            this.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });

    // Card tilt effect for service cards
    $('.services .card').on('mouseenter', function(e){
        $(this).css('transform', 'translateY(-10px) rotateX(5deg)');
    }).on('mouseleave', function(e){
        $(this).css('transform', 'translateY(0) rotateX(0)');
    });

    // Parallax effect for home section
    $(window).scroll(function(){
        var scrolled = $(window).scrollTop();
        $('.home').css('background-position', 'center ' + (scrolled * 0.5) + 'px');
    });

    // Add animation class to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe all service cards, project cards, and skill boxes
    document.querySelectorAll('.card, .project-card, .skill-box, .info-box, .timeline-item').forEach(el => {
        observer.observe(el);
    });

    // Add loading animation
    $(window).on('load', function(){
        $('body').addClass('loaded');
    });

    // Prevent menu from closing when clicking inside it (except on links)
    $('.navbar .menu').on('click', function(e){
        e.stopPropagation();
    });

    // Close menu when clicking outside
    $(document).on('click', function(e){
        if(!$(e.target).closest('.navbar').length) {
            $('.navbar .menu').removeClass('active');
            $('.menu-btn i').removeClass('fa-times');
        }
    });

    // Dynamic copyright year in footer
    var currentYear = new Date().getFullYear();
    $('.footer-text').prepend('<p>&copy; ' + currentYear + ' All rights reserved.</p>');

    // Add hover effect to social icons
    $('.social-icon, .footer-social a').hover(
        function(){
            $(this).css('transform', 'translateY(-5px) scale(1.1)');
        },
        function(){
            $(this).css('transform', 'translateY(0) scale(1)');
        }
    );

    // Preload images for better performance
    function preloadImages() {
        var images = [];
        $('img').each(function(){
            var src = $(this).attr('src');
            if(src) {
                images.push(src);
            }
        });
        
        $(images).each(function(){
            $('<img/>')[0].src = this;
        });
    }

    preloadImages();

    // Add active class to current section in navbar
    $(window).on('scroll', function(){
        var scrollPos = $(document).scrollTop() + 100;
        
        $('.navbar .menu li a').each(function(){
            var currLink = $(this);
            var refElement = $(currLink.attr('href'));
            
            if(refElement.length && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('.navbar .menu li a').removeClass('active');
                currLink.addClass('active');
            } else {
                currLink.removeClass('active');
            }
        });
    });

    // Add smooth reveal animation for sections
    $('.section').each(function(i){
        $(this).css('animation-delay', (i * 0.1) + 's');
    });

    // Easter egg: Konami code
    var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    var konamiIndex = 0;

    $(document).keydown(function(e){
        if(e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if(konamiIndex === konamiCode.length) {
                // Easter egg activated!
                $('body').addClass('rainbow-mode');
                setTimeout(function(){
                    $('body').removeClass('rainbow-mode');
                }, 5000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Console message
    console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #dc143c;');
    console.log('%cWelcome to my portfolio!', 'font-size: 14px; color: #666;');
    console.log('%cIf you\'re seeing this, you might be a developer too! Let\'s connect! 🚀', 'font-size: 12px; color: #999;');

});

// Add fade-in animation styles dynamically
var style = document.createElement('style');
style.innerHTML = `
    .fade-in {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .rainbow-mode * {
        animation: rainbow 2s linear infinite !important;
    }
    
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);
