
$(document).ready(function() {
  const loginForm = $('.login100-form');
  
  // Add error message container (add this in your HTML)
  const errorDiv = $('<div class="alert alert-danger mt-3" id="error-message" style="display: none;"></div>');
  loginForm.after(errorDiv);

  loginForm.on('submit', function(e) {
    e.preventDefault();
    
    const username = $('input[name="username"]').val().trim();
    const password = $('input[name="password"]').val().trim(); // Changed from 'pass' to 'password'

    // Show loading state
    const loginBtn = $('.login100-form-btn');
    const originalBtnText = loginBtn.html();
    loginBtn.html('<i class="fa fa-spinner fa-spin"></i> Logging in...');
    loginBtn.prop('disabled', true);
    errorDiv.hide();

    // Updated endpoint and data structure
    $.ajax({
      url: 'http://localhost:5000/api/auth/login', // Correct endpoint
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ 
        username: username,
        password: password  // Changed from 'pass' to 'password'
      }),
      success: function(response) {
        if (response.success) {
          localStorage.setItem('userData', JSON.stringify(response.user));
          window.location.href = '../admin/dashboard.html';
        } else {
          errorDiv.text(response.message || 'Invalid credentials').fadeIn();
        }
      },
      error: function(xhr) {
        const errorMsg = xhr.responseJSON?.message || 'Login failed. Please try again.';
        errorDiv.text(errorMsg).fadeIn();
      },
      complete: function() {
        loginBtn.html(originalBtnText);
        loginBtn.prop('disabled', false);
      }
    });
  });
});
