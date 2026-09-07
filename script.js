document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const totalSections = sections.length;
  let currentSection = 0;
  let isScrolling = false; // 연속 스크롤 방지 플래그

  // 휠 이벤트 등록
  window.addEventListener('wheel', (e) => {
    e.preventDefault(); // 기본 스크롤 동작 중지

    // 이미 스크롤 애니메이션 진행 중이면 동작 안 함
    if (isScrolling) return;

    if (e.deltaY > 0) {
      // 아래로 휠 내림
      if (currentSection < totalSections - 1) {
        currentSection++;
        scrollToSection(currentSection);
      }
    } else {
      // 위로 휠 올림
      if (currentSection > 0) {
        currentSection--;
        scrollToSection(currentSection);
      }
    }
  }, { passive: false });

  // 해당 섹션으로 부드럽게 이동하는 함수
  function scrollToSection(index) {
    isScrolling = true;

    sections[index].scrollIntoView({
      behavior: 'smooth'
    });

    // 스크롤 동작이 완료될 때까지 대기 (800ms) 후 연속 스크롤 허용
    setTimeout(() => {
      isScrolling = false;
    }, 800);
  }
});