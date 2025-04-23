// Initialize EmailJS with your User ID
(function() {
  emailjs.init('7QHXPYxsxnDZFbdQX');
})();

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
         // Add form validation
         const name = this.user_name.value.trim();
         const email = this.user_email.value.trim();
         const message = this.message.value.trim();
         
         if (!name || !email || !message) {
             alert('Please fill all fields');
             return;
         }
  
  const btn = this.querySelector('button[type="submit"]');
  const alertDiv = document.getElementById('form-alert');
  const spinner = btn.querySelector('.spinner-border');
  const submitText = btn.querySelector('.submit-text');
  
  // Show loading state
  spinner.classList.remove('d-none');
  submitText.textContent = 'Sending...';
  alertDiv.classList.add('d-none');

  // Send email
  emailjs.sendForm('service_vzs58ct', 'template_xjuc04j', this)
      .then(() => {
          alertDiv.textContent = 'Message sent successfully!';
          alertDiv.classList.remove('alert-danger');
          alertDiv.classList.add('alert-success');
          this.reset();
      })
      .catch((error) => {
          alertDiv.textContent = 'Failed to send message. Please try again.';
          alertDiv.classList.remove('alert-success');
          alertDiv.classList.add('alert-danger');
      })
      .finally(() => {
          spinner.classList.add('d-none');
          submitText.textContent = 'Send Message';
          alertDiv.classList.remove('d-none');
      });
});