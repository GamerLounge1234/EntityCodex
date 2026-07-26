(function() {
  // 1. Inject the CSS Styles
  const style = document.createElement('style');
  style.innerHTML = `
    /* The GIF Trigger Box (Bottom Right, Video Style) */
    #ai-trigger-box {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 280px;         /* Wide, like a video */
      height: 157px;        /* 16:9 aspect ratio */
      border-radius: 12px;
      box-shadow: 0 12px 30px rgba(0,0,0,0.4);
      border: 3px solid #ffffff;
      overflow: hidden;
      cursor: pointer;
      z-index: 9998;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      background: #000;
    }
    #ai-trigger-box:hover {
      transform: scale(1.03) translateY(-5px);
      box-shadow: 0 16px 40px rgba(0,0,0,0.5);
    }
    #ai-trigger-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .ai-badge {
      position: absolute;
      bottom: 10px;
      left: 10px;
      background: rgba(0,0,0,0.75);
      color: white;
      padding: 5px 10px;
      font-family: sans-serif;
      font-size: 13px;
      border-radius: 20px;
      font-weight: bold;
      pointer-events: none;
    }

    /* The Full-Screen AI Window */
    #ai-modal-window {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: #ffffff;
      z-index: 9999;
      display: none;        /* Hidden by default */
      flex-direction: column;
    }
    #ai-modal-header {
      height: 50px;
      background: #111827;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      font-family: sans-serif;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    }
    #ai-modal-controls button {
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      margin-left: 15px;
      line-height: 1;
      padding: 5px;
    }
    #ai-modal-controls button:hover {
      color: #9ca3af;
    }
    #ai-iframe-container {
      flex-grow: 1;
      width: 100%;
      height: 100%;
    }
    #ai-iframe-container iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  `;
  document.head.appendChild(style);

  // 2. Inject the GIF Trigger Box
  const trigger = document.createElement('div');
  trigger.id = 'ai-trigger-box';
  trigger.innerHTML = `
    <!-- REPLACE THE SRC LINK BELOW WITH YOUR GIF LINK -->
    <img src="../assets/images/general/ai-trigger.gif" alt="AI Video Assistant" />
    <div class="ai-badge">▶ Chat with AI</div>
  `;
  document.body.appendChild(trigger);

  // 3. Inject the Full Screen Modal
  const modal = document.createElement('div');
  modal.id = 'ai-modal-window';
  modal.innerHTML = `
    <div id="ai-modal-header">
      <div style="font-weight: bold; font-size: 16px; letter-spacing: 0.5px;">Nancy AI</div>
      <div id="ai-modal-controls">
        <button id="ai-min-btn" title="Minimize">−</button>
        <button id="ai-close-btn" title="Close">✕</button>
      </div>
    </div>
    <div id="ai-iframe-container">
      <iframe src="https://nancy-ai-six.vercel.app/" allow="microphone; camera"></iframe>
    </div>
  `;
  document.body.appendChild(modal);

  // 4. Add Interactivity Logic
  const minBtn = document.getElementById('ai-min-btn');
  const closeBtn = document.getElementById('ai-close-btn');
  const iframe = modal.querySelector('iframe');

  // Open window when GIF is clicked
  trigger.addEventListener('click', () => {
    trigger.style.display = 'none';
    modal.style.display = 'flex';
  });

  // Minimize (Hides window, but keeps the AI chat history active in the background)
  minBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    trigger.style.display = 'block';
  });

  // Close (Hides window AND resets the iframe so it starts fresh next time)
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    trigger.style.display = 'block';
    iframe.src = iframe.src; 
  });
})();