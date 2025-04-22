document.addEventListener("DOMContentLoaded", async () => {
  // Initialize DataTable
  const dataTable = $('#add-row').DataTable({
    pageLength: 5,
    columns: [
      { title: "Title" },
      { title: "Description" },
      { title: "CV" },
      { 
        title: "Action",
        orderable: false,
        searchable: false
      }
    ]
  });

  // Close modal handlers
  $('#editModal').on('hidden.bs.modal', () => {
    document.getElementById('edit-form').reset();
  });

  $('#pdfModal').on('hidden.bs.modal', () => {
    document.getElementById('pdfViewer').src = '';
  });

  // Load About data
  async function loadAboutData() {
    try {
      const response = await fetch("http://localhost:5000/api/about");
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to load data');
      }
      
      const { data } = await response.json();
      
      dataTable.clear().draw();
      dataTable.row.add([ 
        data?.title || 'No title',
        data?.description || 'No description',
        data?.cv ? `
        <button class="btn btn-link view-cv" 
                data-cv-url="http://localhost:5000${data.cv}" 
                title="View CV">
          <i class="fas fa-file-pdf"></i> View CV
        </button>
      ` : 'No CV',
      `
        <div class="form-button-action">
          <button type="button" class="btn btn-link btn-primary btn-lg edit-about">
            <i class="fa fa-edit"></i>
          </button>
        </div>
      `
    ]).draw();
  } catch (error) {
    console.error("Error loading about data:", error);
    alert(`Error: ${error.message}`);
  }
}

  // View PDF handler
  document.addEventListener('click', async (e) => {
    if (e.target.closest('.view-cv')) {
      e.preventDefault();
      const cvUrl = e.target.closest('.view-cv').dataset.cvUrl;
      
      // Set loading state
      const pdfViewer = document.getElementById('pdfViewer');
      pdfViewer.classList.add('pdf-loading');
      
      // Set PDF source
      pdfViewer.src = cvUrl;
      
      // Show modal
      $('#pdfModal').modal('show');
      
      // Remove loading state when PDF loads
      pdfViewer.onload = () => {
        pdfViewer.classList.remove('pdf-loading');
      };
    }
  });

  // Edit button handler
  document.addEventListener('click', async (e) => {
    if (e.target.closest('.edit-about')) {
      await openEditModal();
    }
  });

   // Edit modal functions
   async function openEditModal() {
    try {
      const response = await fetch("http://localhost:5000/api/about");
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to load data');
      }
      
      const { data } = await response.json();
      
      // Set form values
      document.getElementById('edit-title').value = data?.title || '';
      document.getElementById('edit-description').value = data?.description || '';
      
      // Show current CV info with full URL
      const cvInfo = document.getElementById('cv-info');
      if (cvInfo) {
        cvInfo.innerHTML = data?.cv ? `
          <div class="mt-2">
            <small>Current CV: </small>
            <a href="http://localhost:5000${data.cv}" target="_blank">
              ${data.cv.split('/').pop()}
            </a>
          </div>
        ` : '<div class="mt-2 text-muted"><small>No CV uploaded</small></div>';
      }

      $('#editModal').modal('show');


      /// Handle form submission
      document.getElementById('edit-form').onsubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        
        // Validate inputs
        const title = document.getElementById('edit-title').value.trim();
        const description = document.getElementById('edit-description').value.trim();
        
        if (!title || !description) {
          alert('Please fill in all required fields');
          return;
        }

        formData.append('title', title);
        formData.append('description', description);
        
        // Handle file upload
        const cvFile = document.getElementById('edit-cv').files[0];
        if (cvFile) {
          if (cvFile.size > 5 * 1024 * 1024) {
            alert('File size exceeds 5MB limit');
            return;
          }
          if (cvFile.type !== 'application/pdf') {
            alert('Only PDF files are allowed');
            return;
          }
          formData.append('cv', cvFile);
        }

        try {
          const response = await fetch("http://localhost:5000/api/about", {
            method: 'PUT',
            body: formData
          });

          const result = await response.json();
          
          if (!response.ok || !result.success) {
            throw new Error(result.message || 'Update failed');
          }

          $('#editModal').modal('hide');
          await loadAboutData();
          alert('Successfully updated!');
        } catch (error) {
          console.error("Update error:", error);
          alert(`Update failed: ${error.message}`);
        }
      };
    } catch (error) {
      console.error("Modal error:", error);
      alert(`Error: ${error.message}`);
    }
  }

  // Initial load
  await loadAboutData();
});