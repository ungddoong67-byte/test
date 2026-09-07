document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const totalSections = sections.length;
  let currentSection = 0;
  let isScrolling = false; // 연속 스크롤 방지 플래그

  // 모바일 터치 위치 저장 변수
  let touchStartY = 0;
  let touchEndY = 0;

  // [PC] 마우스 휠 이벤트
  window.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (isScrolling) return;

    if (e.deltaY > 0) {
      if (currentSection < totalSections - 1) {
        currentSection++;
        scrollToSection(currentSection);
      }
    } else {
      if (currentSection > 0) {
        currentSection--;
        scrollToSection(currentSection);
      }
    }
  }, { passive: false });

  // [모바일] 터치 시작 위치 기록
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  // [모바일] 터치 이동 시 기본 바운스 스크롤 방지
  window.addEventListener('touchmove', (e) => {
    e.preventDefault();
  }, { passive: false });

  // [모바일] 터치 종료 시 방향 계산 후 이동
  window.addEventListener('touchend', (e) => {
    if (isScrolling) return;
    touchEndY = e.changedTouches[0].clientY;

    const diffY = touchStartY - touchEndY;

    // 최소 50px 이상 쓸어올렸거나 내렸을 때만 동작
    if (Math.abs(diffY) > 50) {
      if (diffY > 0) {
        // 손가락을 위로 쓸어올림 -> 다음 섹션
        if (currentSection < totalSections - 1) {
          currentSection++;
          scrollToSection(currentSection);
        }
      } else {
        // 손가락을 아래로 쓸어내림 -> 이전 섹션
        if (currentSection > 0) {
          currentSection--;
          scrollToSection(currentSection);
        }
      }
    }
  });

  // 해당 섹션으로 부드럽게 이동하는 공통 함수
  function scrollToSection(index) {
    isScrolling = true;

    sections[index].scrollIntoView({
      behavior: 'smooth'
    });

    setTimeout(() => {
      isScrolling = false;
    }, 800);
  }
});