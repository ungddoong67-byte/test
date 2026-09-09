const container = document.getElementById('mainContainer');
const sections = document.querySelectorAll('.section');
const dots = document.querySelectorAll('.dot');
let isScrolling = false;

// 마우스 우클릭 방지
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// 텍스트 및 드래그 선택 방지
document.addEventListener('selectstart', (e) => {
  e.preventDefault();
});

// 이미지 및 요소 드래그 방지
document.addEventListener('dragstart', (e) => {
  e.preventDefault();
});

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
      if (dots[index]) {
        dots[index].classList.add('active');
      }
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

document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('mainContainer');
  const sections = document.querySelectorAll('.section, .section-normal');
  let isScrolling = false;
  let currentIndex = 0;

  // Wheel 이벤트 제어 (PC 스크롤 감지)
  container.addEventListener('wheel', function (e) {
    // 7번째(마지막) 섹션 내부에 도착했을 때 처리
    if (currentIndex === sections.length - 1) {
      // 7번 섹션 최상단에서 위로 스크롤 시 6번 섹션으로 이동
      if (e.deltaY < 0 && container.scrollTop <= sections[currentIndex].offsetTop) {
        e.preventDefault();
        goToSection(currentIndex - 1);
      }
      // 7번 섹션 내부에서는 일반 스크롤 허용
      return;
    }

    e.preventDefault();

    if (isScrolling) return;

    if (e.deltaY > 0) {
      // 아래로 스크롤
      if (currentIndex < sections.length - 1) {
        goToSection(currentIndex + 1);
      }
    } else {
      // 위로 스크롤
      if (currentIndex > 0) {
        goToSection(currentIndex - 1);
      }
    }
  }, { passive: false });

  function goToSection(index) {
    isScrolling = true;
    currentIndex = index;

    sections[index].scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    setTimeout(function () {
      isScrolling = false;
    }, 700); // 스크롤 애니메이션 동작 시간 동안 중복 감지 방지
  }
});
