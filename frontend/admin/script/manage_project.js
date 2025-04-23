// script/manage_project.js
document.addEventListener("DOMContentLoaded", function() {
    let dataTable;
  
    // Initialize DataTable
    function initDataTable() {
      dataTable = $('#add-row').DataTable({
        processing: true,
        serverSide: false,
        ajax: {
          url: 'http://localhost:5000/api/project',
          dataSrc: 'data'
        },
        columns: [
          { data: 'title', title: 'Project Name' },
          { data: 'description', title: 'Description' },
          {
            data: 'image',
            title: 'Image',
            render: function(data) {
              return `<img src="http://localhost:5000${data}" class="project-image" height="40">`;
            }
          },
          {
            data: '_id',
            title: 'Actions',
            render: function(data) {
              return `
                <div class="form-button-action">
                  <button class="btn btn-link btn-primary btn-lg edit-project" data-id="${data}">
                    <i class="fa fa-edit"></i>
                  </button>
                  <button class="btn btn-link btn-danger delete-project" data-id="${data}">
                    <i class="fa fa-times"></i>
                  </button>
                </div>
              `;
            }
          }
        ]
      });
    }
  
    // Load projects
    async function loadProjects() {
      try {
        const response = await fetch('http://localhost:5000/api/project');
        if (!response.ok) throw new Error('Failed to fetch projects');
  
        const { data } = await response.json();
        if (dataTable) {
          dataTable.clear().rows.add(data).draw();
        }
      } catch (error) {
        console.error('Error:', error);
        alert(error.message);
      }
    }
  
    // Add Project
    document.getElementById('addRowButton').addEventListener('click', async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('title', document.getElementById('addTitle').value);
      formData.append('description', document.getElementById('addDescription').value);
      formData.append('image', document.getElementById('addImage').files[0]);
  
      try {
        const response = await fetch('http://localhost:5000/api/project', {
          method: 'POST',
          body: formData
        });
  
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }
  
        $('#addRowModal').modal('hide');
        document.getElementById('addTitle').value = '';
        document.getElementById('addDescription').value = '';
        document.getElementById('addImage').value = '';
  
        await loadProjects();
      } catch (error) {
        console.error('Error:', error);
        alert(error.message);
      }
    });
  
    // Edit Project
    $(document).on('click', '.edit-project', async function() {
      const projectId = $(this).data('id');
      try {
        const response = await fetch(`http://localhost:5000/api/project/${projectId}`);
        const { data } = await response.json();
  
        document.getElementById('editProjectId').value = data._id;
        document.getElementById('editTitle').value = data.title;
        document.getElementById('editDescription').value = data.description;
        document.getElementById('currentImage').innerHTML = `
          <img src="http://localhost:5000${data.image}" height="50" class="mb-2">
        `;
  
        $('#editProjectModal').modal('show');
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to load project data');
      }
    });
  
    // Update Project
    document.getElementById('editProjectForm').addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('title', document.getElementById('editTitle').value);
      formData.append('description', document.getElementById('editDescription').value);
  
      const fileInput = document.getElementById('editImage');
      if (fileInput.files.length > 0) {
        formData.append('image', fileInput.files[0]);
      }
  
      try {
        const response = await fetch(`http://localhost:5000/api/project/${document.getElementById('editProjectId').value}`, {
          method: 'PUT',
          body: formData
        });
  
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }
  
        $('#editProjectModal').modal('hide');
        await loadProjects();
      } catch (error) {
        console.error('Error:', error);
        alert(error.message);
      }
    });
  
    // Delete Project
    $(document).on('click', '.delete-project', async function() {
      const projectId = $(this).data('id');
      if (!confirm('Are you sure you want to delete this project?')) return;
  
      try {
        const response = await fetch(`http://localhost:5000/api/project/${projectId}`, {
          method: 'DELETE'
        });
  
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }
  
        await loadProjects();
      } catch (error) {
        console.error('Error:', error);
        alert(error.message);
      }
    });
  
    // Initial setup
    initDataTable();
    loadProjects();
  });
  