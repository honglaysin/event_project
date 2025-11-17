$(document).ready(function () {
        // Calculate the total height of the fixed navigation bar (TopNavigation + main-nav)
        const topNavHeight = $(".TopNavigation").outerHeight() || 0;
        const mainNavHeight = $(".main-nav").outerHeight() || 0;
        // Adjust the offset to be slightly less than the navigation height
        // to ensure the link highlights just before the section title hits the top.
        const offset = topNavHeight + mainNavHeight + 5;

        // An array to store all section positions
        const sections = [];
        $('.main-nav a[href*="#"]').each(function () {
          const targetSelector = $(this).attr("href");
          const target = $(targetSelector);

          if (target.length) {
            sections.push({
              // Get the clean ID (e.g., 'home', 'agenda')
              id: targetSelector.substring(1),
              // Calculate the top position relative to the document
              top: target.offset().top - offset,
            });
          }
        });

        // Sort sections by their top position to easily find the active one
        sections.sort((a, b) => a.top - b.top);

        function activateNavLink(id) {
          // Remove 'selected' from all links
          $(".main-nav a.nav-link").removeClass("selected");

          // Add 'selected' to the corresponding link using the mapped ID
          $(`#link-${id}`).addClass("selected");
        }

        function checkScrollPosition() {
          // Add a small buffer to the scroll position
          const scrollPos = $(window).scrollTop() + 4;
          let activeSectionId = "home"; // Default to the first link

          // Iterate through sections to find the last one the user has entered
          for (let i = sections.length - 1; i >= 0; i--) {
            if (scrollPos >= sections[i].top) {
              activeSectionId = sections[i].id;
              break;
            }
          }
          activateNavLink(activeSectionId);
        }

        // 1. Initial check on load to set the correct active link
        checkScrollPosition();

        // 2. Check position on every scroll event
        $(window).on("scroll", checkScrollPosition);

        // 3. Smooth scrolling when a link is clicked
        $('.main-nav a[href*="#"]').on("click", function (e) {
          e.preventDefault();
          const target = $($(this).attr("href"));

          $("html, body").animate(
            {
              // Scroll directly to the calculated position
              scrollTop: target.offset().top - offset + 1,
            },
            500
          );

          // The scroll event handler will take care of updating the 'selected' class
        });
      });
      const swiper = new Swiper('.swiper', {
        loop: true,                   // infinite loop
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        autoplay: {
          delay: 3000,                // auto slide every 3s
          disableOnInteraction: false,
        },
        effect: 'slide',              // Slide left-right
        speed: 600,                   // Smooth animation
      });
      const modal = document.getElementById("termsModal");
      const btn = document.getElementById("termsLink");
      const span = document.querySelector(".modal .close");

      btn.onclick = function(e) {
        e.preventDefault();
        modal.style.display = "block";
      }

      span.onclick = function() {
        modal.style.display = "none";
      }

      window.onclick = function(event) {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      }
      