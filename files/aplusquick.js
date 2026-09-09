    // 컨테이너
    const container = document.getElementById('mainContainer');
    const sections = document.querySelectorAll('.section');
    const dots = document.querySelectorAll('.dot');
    let isScrolling = false;

    // 점 클릭 시 이동
    function scrollToSection(index) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }

    // 스크롤 감지 및 활성 점 표시
    container.addEventListener('scroll', () => {
      const scrollPosition = container.scrollTop;
      const windowHeight = window.innerHeight;

      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        if (scrollPosition >= sectionTop - windowHeight / 3) {
          dots.forEach(dot => dot.classList.remove('active'));
          dots[index].classList.add('active');
        }
      });
    });

    // 마우스 휠 1섹션씩 이동 제어
    container.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (isScrolling) return;

      const delta = e.deltaY;
      const currentScroll = container.scrollTop;
      const windowHeight = window.innerHeight;
      let targetIndex = Math.round(currentScroll / windowHeight);

      if (delta > 0) {
        targetIndex = Math.min(targetIndex + 1, sections.length - 1);
      } else {
        targetIndex = Math.max(targetIndex - 1, 0);
      }

      isScrolling = true;
      scrollToSection(targetIndex);

      setTimeout(() => {
        isScrolling = false;
      }, 700);
    }, { passive: false });
