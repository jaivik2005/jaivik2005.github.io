/**
 * CodeMentor AI
 * Chatbot Controller
 */

class CodeMentorChatbot {
    constructor() {
        this.toggler = document.getElementById('chatbot-toggler');
        this.window = document.getElementById('chatbot-window');
        this.body = document.getElementById('chatbot-body');
        this.input = document.getElementById('chatbot-input');
        this.sendBtn = document.getElementById('chatbot-send-btn');
        this.clearBtn = document.getElementById('clear-chat-btn');

        // Chat History Memory
        this.chatHistory = []; // Array of {role: 'user'|'model', parts: [{text: '...'}]} -> Gemini API format

        this.init();
    }

    init() {
        if (!this.toggler || !this.window) return;

        // Toggler
        this.toggler.addEventListener('click', () => {
            this.toggler.classList.toggle('active');
            this.window.classList.toggle('active');
            if (this.window.classList.contains('active')) {
                this.input.focus();
                this.scrollToBottom();
            }
        });

        // Send Button
        this.sendBtn.addEventListener('click', () => this.handleSend());

        // Enter key in textarea (Shift+Enter for newline)
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSend();
            }
        });

        // Auto-resize textarea
        this.input.addEventListener('input', () => {
            this.input.style.height = 'auto';
            this.input.style.height = (this.input.scrollHeight) + 'px';
        });

        // Clear Chat
        this.clearBtn.addEventListener('click', () => this.clearChat());
    }

    async handleSend() {
        const text = this.input.value.trim();
        if (!text) return;

        // Reset input
        this.input.value = '';
        this.input.style.height = 'auto';

        // Add User Message
        this.appendMessage('user', text, text); // user msg doesn't need markdown parse immediately

        // Save to memory
        this.chatHistory.push({ role: 'user', content: text });

        // Show typing
        const typingId = this.showTypingIndicator();

        try {
            // Get AI Response
            const aiRawText = await this.fetchAIResponse(text);

            // Remove typing
            this.removeTypingIndicator(typingId);

            // Add AI Message
            const htmlContent = this.parseMarkdown(aiRawText);
            this.appendMessage('ai', aiRawText, htmlContent);

            // Save to memory
            this.chatHistory.push({ role: 'assistant', content: aiRawText });
        } catch (error) {
            this.removeTypingIndicator(typingId);
            this.appendMessage('ai', "Sorry, I am having trouble connecting right now.", "<p>Sorry, I am having trouble connecting right now.</p>");
        }
    }

    appendMessage(sender, rawText, htmlContent) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chatbot-msg msg-${sender}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'msg-content';
        contentDiv.innerHTML = sender === 'user' ? `<p>${this.escapeHtml(rawText)}</p>` : htmlContent;

        msgDiv.appendChild(contentDiv);
        this.body.appendChild(msgDiv);

        // Attach copy button listeners if it's AI
        if (sender === 'ai') {
            this.attachCopyListeners(msgDiv);
        }

        this.scrollToBottom();
    }

    showTypingIndicator() {
        const id = 'typing-' + Date.now();
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = id;
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        this.body.appendChild(typingDiv);
        this.scrollToBottom();
        return id;
    }

    removeTypingIndicator(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }

    scrollToBottom() {
        this.body.scrollTop = this.body.scrollHeight;
    }

    clearChat() {
        this.body.innerHTML = `
            <div class="chatbot-msg msg-ai">
                <div class="msg-content">
                    <p>Hello there! I'm <strong>CodeMentor AI</strong>. How can I help you with web development today?</p>
                </div>
            </div>
        `;
        this.chatHistory = [];
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    // --- MARKDOWN PARSER (Using marked.js if available, else basic fallback) ---
    parseMarkdown(text) {
        if (window.marked && window.marked.parse) {
            // Configure marked for custom code blocks
            const renderer = new marked.Renderer();
            renderer.code = function ({ text: code, lang: language }) {
                // Support both older and newer marked arguments
                const actualCode = typeof code === 'string' ? code : (arguments[0] || '');
                const lang = language || arguments[1] || 'code';

                return `
                <div class="msg-code-block">
                    <div class="msg-code-header">
                        <span>${lang}</span>
                        <button class="btn-copy-code" data-code="${encodeURIComponent(actualCode)}">
                            <i class="far fa-copy"></i> Copy code
                        </button>
                    </div>
                    <pre><code>${actualCode.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
                </div>`;
            };

            try {
                if (window.marked.use) {
                    window.marked.use({ renderer });
                    return window.marked.parse(text);
                } else {
                    return window.marked.parse(text, { renderer: renderer });
                }
            } catch (e) {
                return window.marked.parse(text); // Fallback to raw parse
            }
        } else {
            console.warn("marked.js is not loaded. Using fallback basic formatter.");
            // Extremely basic fallback
            return `<p>${this.escapeHtml(text)}</p>`;
        }
    }

    attachCopyListeners(container) {
        const btns = container.querySelectorAll('.btn-copy-code');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const code = decodeURIComponent(btn.getAttribute('data-code'));
                navigator.clipboard.writeText(code).then(() => {
                    btn.innerHTML = `<i class="fas fa-check"></i> Copied!`;
                    setTimeout(() => {
                        btn.innerHTML = `<i class="far fa-copy"></i> Copy code`;
                    }, 2000);
                });
            });
        });
    }

    // --- AI API INTEGRATION (Mocked for now, ready for OpenAI/Gemini) ---
    async fetchAIResponse(userMessage) {

        // TODO: Replace with real API call
        // Example for Gemini API:
        /*
        const response = await fetch('YOUR_GEMINI_ENDPOINT', {
            method: 'POST',
            body: JSON.stringify({ contents: this.chatHistory })
        });
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
        */

        return new Promise(resolve => {
            setTimeout(() => {
                let lowerText = userMessage.toLowerCase();
                let reply = "I'm your **CodeMentor AI**. I can help you understand HTML, CSS, JavaScript, and more! How can I assist you today?\n\nIf you have a coding problem, try pasting your code or explaining what you're trying to build.";

                if (lowerText.includes('flexbox')) {
                    reply = "### What is Flexbox?\n\nFlexbox (Flexible Box Layout) is a CSS layout module designed to align and distribute space among items in a container.\n\nHere is a simple example to center a div:\n\n```css\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}\n```\n\n1. **`display: flex`** turns the container into a flex context.\n2. **`justify-content`** aligns items horizontally.\n3. **`align-items`** aligns items vertically.\n\nWould you like me to explain `flex-wrap` or `flex-direction` next?";
                } else if (lowerText.includes('html')) {
                    reply = "HTML (**HyperText Markup Language**) is the standard language for creating web pages. It defines the structure and layout of a web document using tags.\n\n```html\n<!DOCTYPE html>\n<html>\n  <head>\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello World!</h1>\n  </body>\n</html>\n```\n\nHTML gives structure, CSS gives style, and JavaScript gives interactivity.";
                } else if (lowerText.includes('margin') || lowerText.includes('padding')) {
                    reply = "### Margin vs Padding\nLet's clear this up! Based on the CSS Box Model:\n\n*   **Padding** is the space **inside** the border, between the content and the border itself.\n*   **Margin** is the space **outside** the border, pushing other elements away.\n\n```css\n.box {\n  padding: 20px; /* Space inside */\n  margin: 20px;  /* Space outside */\n  border: 1px solid black;\n}\n```";
                } else if (lowerText.includes('center a div')) {
                    reply = "Centering a div used to be hard, but not anymore! The easiest modern way is using **Flexbox** or **Grid**.\n\nUsing Grid:\n```css\n.parent {\n  display: grid;\n  place-items: center;\n  height: 100vh;\n}\n```\n\nThis will perfectly center `.child` horizontally and vertically!";
                }

                resolve(reply);
            }, 1000 + Math.random() * 1000); // simulate network delay 1-2s
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.codeMentor = new CodeMentorChatbot();
});
