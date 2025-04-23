// script/manage_skill.js
document.addEventListener("DOMContentLoaded", function() {
  let dataTable;

  // Initialize DataTable
  function initDataTable() {
    dataTable = $('#add-row').DataTable({
      processing: true,
      serverSide: false,
      ajax: {
        url: 'http://localhost:5000/api/skill',
        dataSrc: 'data'
      },
      columns: [
        { data: 'title' },
        { data: 'description' },
        { 
          data: 'icon',
          render: function(data) {
            return `<img src="http://localhost:5000${data}" class="skill-icon" height="40">`;
          }
        },
        {
          data: '_id',
          render: function(data) {
            return `
              <div class="form-button-action">
                <button class="btn btn-link btn-primary btn-lg edit-skill" data-id="${data}">
                  <i class="fa fa-edit"></i>
                </button>
                <button class="btn btn-link btn-danger delete-skill" data-id="${data}">
                  <i class="fa fa-times"></i>
                </button>
              </div>
            `;
          }
        }
      ]
    });
  }

  // Load skills
  async function loadSkills() {
    try {
      const response = await fetch('http://localhost:5000/api/skill');
      if (!response.ok) throw new Error('Failed to fetch skills');
      
      const { data } = await response.json();
      if (dataTable) {
        dataTable.clear().rows.add(data).draw();
      }
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  }

  // Add Skill
  document.getElementById('addRowButton').addEventListener('click', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', document.getElementById('addTitle').value);
    formData.append('description', document.getElementById('addDescription').value);
    formData.append('icon', document.getElementById('addIcon').files[0]);

    try {
      const response = await fetch('http://localhost:5000/api/skill', {
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
      document.getElementById('addIcon').value = '';
      
      await loadSkills();
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  });

  // Edit Skill
  $(document).on('click', '.edit-skill', async function() {
    const skillId = $(this).data('id');
    try {
      const response = await fetch(`http://localhost:5000/api/skill/${skillId}`);
      const { data } = await response.json();

      // Populate edit form
      document.getElementById('editSkillId').value = data._id;
      document.getElementById('editTitle').value = data.title;
      document.getElementById('editDescription').value = data.description;
      document.getElementById('currentIcon').innerHTML = `
        <img src="http://localhost:5000${data.icon}" height="50" class="mb-2">
      `;

      $('#editSkillModal').modal('show');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to load skill data');
    }
  });

  // Update Skill
  document.getElementById('editSkillForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', document.getElementById('editTitle').value);
    formData.append('description', document.getElementById('editDescription').value);
    
    const fileInput = document.getElementById('editIcon');
    if (fileInput.files.length > 0) {
      formData.append('icon', fileInput.files[0]);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/skill/${document.getElementById('editSkillId').value}`, {
        method: 'PUT',
        body: formData
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      $('#editSkillModal').modal('hide');
      await loadSkills();
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  });

  // Delete Skill
  $(document).on('click', '.delete-skill', async function() {
    const skillId = $(this).data('id');
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/skill/${skillId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message);
      }

      await loadSkills();
    } catch (error) {
      console.error('Error:', error);
      alert(error.message);
    }
  });

  // Initial setup
  initDataTable();
  loadSkills();
});