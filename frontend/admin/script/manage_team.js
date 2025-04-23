
document.addEventListener("DOMContentLoaded", function() {
    let dataTable;
  
    // Initialize DataTable
    function initDataTable() {
      dataTable = $('#add-row').DataTable({
        processing: true,
        serverSide: false,
        ajax: {
          url: 'http://localhost:5000/api/member',
          dataSrc: 'data'
        },
        columns: [
          { data: 'name', title: 'Member Name' },
          { data: 'info', title: 'Member Info' },
          {
            data: 'avatar',
            title: 'Avatar',
            render: function(data) {
              return `<img src="http://localhost:5000${data}" class="member-image" height="40">`;
            }
          },
          {
            data: '_id',
            title: 'Actions',
            render: function(data) {
              return `
                <div class="form-button-action">
                  <button class="btn btn-link btn-primary btn-lg edit-member" data-id="${data}">
                    <i class="fa fa-edit"></i>
                  </button>
                  <button class="btn btn-link btn-danger delete-member" data-id="${data}">
                    <i class="fa fa-times"></i>
                  </button>
                </div>
              `;
            }
          }
        ]
      });
    }
  
    // Load members
    async function loadTeam() {
      try {
        const response = await fetch('http://localhost:5000/api/member');
        if (!response.ok) throw new Error('Failed to fetch members');
  
        const { data } = await response.json();
        if (dataTable) {
          dataTable.clear().rows.add(data).draw();
        }
      } catch (error) {
        console.error('Error:', error);
        alert(error.message);
      }
    }
  
// Add Member
document.getElementById('addRowButton').addEventListener('click', async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', document.getElementById('addName').value);
  formData.append('info', document.getElementById('addInfo').value);
  formData.append('avatar', document.getElementById('addAvatar').files[0]);

  try {
    const response = await fetch('http://localhost:5000/api/member', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    $('#addRowModal').modal('hide');
    document.getElementById('addName').value = '';
    document.getElementById('addInfo').value = '';
    document.getElementById('addAvatar').value = '';

    await loadTeam();
  } catch (error) {
    console.error('Error:', error);
    alert(error.message);
  }
});
  
    // Edit Member
    $(document).on('click', '.edit-member', async function() {
      const memberId = $(this).data('id');
      try {
        const response = await fetch(`http://localhost:5000/api/member/${memberId}`);
        const { data } = await response.json();
  
        document.getElementById('editMemberId').value = data._id;
        document.getElementById('editName').value = data.name;
        document.getElementById('editInfo').value = data.info;
        document.getElementById('currentAvatar').innerHTML = `
          <img src="http://localhost:5000${data.avatar}" height="50" class="mb-2">
        `;
  
        $('#editMemberModal').modal('show');
      } catch (error) {
        console.error('Error:', error);
        alert('Failed to load member data');
      }
    });
  
    // Update Member
    document.getElementById('editMemberForm').addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const formData = new FormData();
      formData.append('name', document.getElementById('editName').value);
      formData.append('info', document.getElementById('editInfo').value);
  
      const fileInput = document.getElementById('editAvatar');
      if (fileInput.files.length > 0) {
        formData.append('avatar', fileInput.files[0]);
      }
  
      try {
        const response = await fetch(`http://localhost:5000/api/member/${document.getElementById('editMemberId').value}`, {
          method: 'PUT',
          body: formData
        });
  
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }
  
        $('#editMemberModal').modal('hide');
        await loadTeam();
      } catch (error) {
        console.error('Error:', error);
        alert(error.message);
      }
    });
  
    // Delete Member
    $(document).on('click', '.delete-member', async function() {
      const memberId = $(this).data('id');
      if (!confirm('Are you sure you want to delete this member?')) return;
  
      try {
        const response = await fetch(`http://localhost:5000/api/member/${memberId}`, {
          method: 'DELETE'
        });
  
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }
  
        await loadTeam();
      } catch (error) {
        console.error('Error:', error);
        alert(error.message);
      }
    });
  
    // Initial setup
    initDataTable();
    loadTeam();
  });
  