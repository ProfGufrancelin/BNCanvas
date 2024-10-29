
function addItem(listId) {
  const list = document.getElementById(listId);
  const input = list.parentElement.querySelector('.add-input');
  const text = input.value.trim();
  
  if (text) {
    const li = document.createElement('li');
    li.className = 'content-item';
    li.innerHTML = `
      <span>${text}</span>
      <button class="delete-btn" onclick="deleteItem(this)">×</button>
    `;
    list.appendChild(li);
    input.value = '';
  }
}

function deleteItem(button) {
  button.parentElement.remove();
}

function saveCanvas() {
  const sections = document.querySelectorAll('.section');
  let canvasData = {};
  
  sections.forEach(section => {
    const title = section.querySelector('h3').textContent;
    const items = Array.from(section.querySelectorAll('.content-item span'))
                      .map(span => span.textContent);
    canvasData[title] = items;
  });
  
  localStorage.setItem('businessCanvas', JSON.stringify(canvasData));
  alert('Canvas salvo com sucesso!');
}

function clearCanvas() {
  if (confirm('Tem certeza que deseja limpar todo o canvas?')) {
    document.querySelectorAll('.content-list').forEach(list => {
      list.innerHTML = '';
    });
    document.querySelectorAll('.add-input').forEach(input => {
      input.value = '';
    });
    localStorage.removeItem('businessCanvas');
  }
}

function saveAsPDF() {
  const element = document.querySelector('.canvas');
  const opt = {
    margin: 10,
    filename: 'business-model-canvas.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a3', orientation: 'landscape' }
  };

  html2pdf().set(opt).from(element).save();
}

window.onload = function() {
  const savedCanvas = localStorage.getItem('businessCanvas');
  
  if (savedCanvas) {
    const canvasData = JSON.parse(savedCanvas);
    Object.entries(canvasData).forEach(([title, items]) => {
      const section = Array.from(document.querySelectorAll('.section'))
                          .find(s => s.querySelector('h3').textContent === title);
      if (section) {
        const list = section.querySelector('.content-list');
        items.forEach(item => {
          const li = document.createElement('li');
          li.className = 'content-item';
          li.innerHTML = `
            <span>${item}</span>
            <button class="delete-btn" onclick="deleteItem(this)">×</button>
          `;
          list.appendChild(li);
        });
      }
    });
  }
}
