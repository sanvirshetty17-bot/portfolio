// ===================================================
// Footer year
// ===================================================
document.getElementById("year").textContent = new Date().getFullYear();

// ===================================================
// Mobile nav toggle
// ===================================================
const navToggle = document.getElementById("navToggle");
const navLinks = document.querySelector(".nav__links");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ===================================================
// Education progress bar — fills based on current year
// within the 2025–2029 batch window
// ===================================================
(function setEducationProgress(){
  const startYear = 2025;
  const endYear = 2029;
  const fill = document.getElementById("eduProgress");
  if (!fill) return;

  const now = new Date();
  const totalMonths = (endYear - startYear) * 12;
  let elapsedMonths = (now.getFullYear() - startYear) * 12 + now.getMonth();
  elapsedMonths = Math.max(0, Math.min(totalMonths, elapsedMonths));
  const pct = Math.round((elapsedMonths / totalMonths) * 100);

  requestAnimationFrame(() => {
    fill.style.width = pct + "%";
  });
})();

// ===================================================
// Hero node-graph — an SVG network diagram connecting
// "Sanvi" to her core skill areas, drawn programmatically
// ===================================================
(function buildNodeGraph(){
  const svg = document.getElementById("nodeGraph");
  if (!svg) return;

  const centerX = 240, centerY = 240;
  const skills = [
    "C", "Python", "Data Analysis",
    "Statistics", "Problem Solving", "Digital Electronics"
  ];

  const radius = 165;
  const nodes = skills.map((label, i) => {
    const angle = (i / skills.length) * Math.PI * 2 - Math.PI / 2;
    return {
      label,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    };
  });

  const ns = "http://www.w3.org/2000/svg";
  const frag = document.createDocumentFragment();

  // Edges (drawn first, sit beneath nodes)
  nodes.forEach(n => {
    const line = document.createElementNS(ns, "line");
    line.setAttribute("x1", centerX);
    line.setAttribute("y1", centerY);
    line.setAttribute("x2", n.x);
    line.setAttribute("y2", n.y);
    line.setAttribute("class", "graph-edge");
    line.style.opacity = "0";
    frag.appendChild(line);
  });

  // Outer skill nodes + labels
  nodes.forEach((n, i) => {
    const circle = document.createElementNS(ns, "circle");
    circle.setAttribute("cx", n.x);
    circle.setAttribute("cy", n.y);
    circle.setAttribute("r", 26);
    circle.setAttribute("class", "graph-node");
    circle.style.opacity = "0";
    circle.style.transformOrigin = `${n.x}px ${n.y}px`;
    frag.appendChild(circle);

    const words = n.label.split(" ");
    words.forEach((word, wi) => {
      const text = document.createElementNS(ns, "text");
      text.setAttribute("x", n.x);
      text.setAttribute("y", n.y + (wi - (words.length - 1) / 2) * 12 + 4);
      text.setAttribute("text-anchor", "middle");
      text.setAttribute("class", "graph-label");
      text.style.opacity = "0";
      text.textContent = word;
      frag.appendChild(text);
    });
  });

  // Center node — "Sanvi"
  const centerCircle = document.createElementNS(ns, "circle");
  centerCircle.setAttribute("cx", centerX);
  centerCircle.setAttribute("cy", centerY);
  centerCircle.setAttribute("r", 46);
  centerCircle.setAttribute("class", "graph-node graph-node--center");
  frag.appendChild(centerCircle);

  const centerText = document.createElementNS(ns, "text");
  centerText.setAttribute("x", centerX);
  centerText.setAttribute("y", centerY - 2);
  centerText.setAttribute("text-anchor", "middle");
  centerText.setAttribute("class", "graph-label graph-label--center");
  centerText.textContent = "Sanvi";
  frag.appendChild(centerText);

  const centerText2 = document.createElementNS(ns, "text");
  centerText2.setAttribute("x", centerX);
  centerText2.setAttribute("y", centerY + 14);
  centerText2.setAttribute("text-anchor", "middle");
  centerText2.setAttribute("class", "graph-label graph-label--center");
  centerText2.style.fontSize = "9px";
  centerText2.style.opacity = "0.8";
  centerText2.textContent = "R Shetty";
  frag.appendChild(centerText2);

  svg.appendChild(frag);

  // Staggered entrance animation (respects reduced-motion)
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const edges = svg.querySelectorAll(".graph-edge");
  const circles = svg.querySelectorAll(".graph-node:not(.graph-node--center)");
  const labels = svg.querySelectorAll(".graph-label:not(.graph-label--center)");

  if (prefersReduced) {
    edges.forEach(el => el.style.opacity = "1");
    circles.forEach(el => el.style.opacity = "1");
    labels.forEach(el => el.style.opacity = "1");
    return;
  }

  edges.forEach((el, i) => {
    el.style.transition = "opacity 0.6s ease";
    setTimeout(() => { el.style.opacity = "1"; }, 150 + i * 90);
  });
  circles.forEach((el, i) => {
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    el.style.transform = "scale(0.5)";
    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "scale(1)";
    }, 300 + i * 90);
  });
  labels.forEach((el, i) => {
    el.style.transition = "opacity 0.5s ease";
    setTimeout(() => { el.style.opacity = "1"; }, 450 + i * 90);
  });

  // Gentle ambient pulse on the center node
  let pulseUp = true;
  setInterval(() => {
    centerCircle.style.transition = "r 1.8s ease-in-out";
    centerCircle.setAttribute("r", pulseUp ? 49 : 46);
    pulseUp = !pulseUp;
  }, 1800);
})();

// ===================================================
// Resume download placeholder
// Replace the href below with a real resume PDF link
// (e.g. "resume.pdf" placed alongside these files) once
// you have one ready — for now this prompts a friendly note.
// ===================================================
const resumeLink = document.getElementById("resumeLink");
if (resumeLink) {
  resumeLink.addEventListener("click", (e) => {
    if (resumeLink.getAttribute("href") === "#") {
      e.preventDefault();
      alert("Add your resume PDF as 'resume.pdf' in this folder, then update the resumeLink href in index.html to point to it.");
    }
  });
}
