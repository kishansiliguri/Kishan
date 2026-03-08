async function initAdmin() {
    const res = await fetch('/api/me');
    const data = await res.json();
    if (!data.loggedIn || data.user.role !== 'admin') {
        alert('Unauthorized!');
        window.location.href = '/';
        return;
    }
    loadAdminCategories();
    loadAdminItems();
}

async function loadAdminCategories() {
    const res = await fetch('/api/categories');
    const categories = await res.json();
    const select = document.getElementById('item-cat');
    select.innerHTML = '';
    categories.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat.id;
        opt.innerText = cat.name;
        select.appendChild(opt);
    });
}

async function loadAdminItems() {
    const res = await fetch('/api/items');
    const items = await res.json();
    const list = document.getElementById('admin-items-list');
    list.innerHTML = '';
    items.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>₹${item.price}</td>
            <td>${item.category_id}</td>
            <td><button class="delete-btn" onclick="deleteItem(${item.id})">Delete</button></td>
        `;
        list.appendChild(tr);
    });
}

async function deleteItem(id) {
    if (confirm('Delete this item?')) {
        await fetch(`/api/admin/items/${id}`, { method: 'DELETE' });
        loadAdminItems();
    }
}

// Add Category
document.getElementById('add-cat-btn').onclick = async () => {
    const name = document.getElementById('cat-name').value;
    const icon = document.getElementById('cat-icon').value;
    const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, icon })
    });
    if (res.ok) {
        alert('Category added!');
        loadAdminCategories();
    }
};

// Add Item
document.getElementById('add-item-btn').onclick = async () => {
    const formData = new FormData();
    formData.append('name', document.getElementById('item-name').value);
    formData.append('description', document.getElementById('item-desc').value);
    formData.append('price', document.getElementById('item-price').value);
    formData.append('category_id', document.getElementById('item-cat').value);
    
    const fileInput = document.getElementById('item-image-file');
    if (fileInput.files[0]) {
        formData.append('image', fileInput.files[0]);
    } else {
        formData.append('image_url', document.getElementById('item-image-url').value);
    }

    const res = await fetch('/api/admin/items', {
        method: 'POST',
        body: formData
    });
    if (res.ok) {
        alert('Item added!');
        loadAdminItems();
    }
};

// Add Banner
document.getElementById('add-banner-btn').onclick = async () => {
    const formData = new FormData();
    formData.append('title', document.getElementById('banner-title').value);
    formData.append('subtitle', document.getElementById('banner-subtitle').value);
    
    const fileInput = document.getElementById('banner-image-file');
    if (fileInput.files[0]) {
        formData.append('image', fileInput.files[0]);
    } else {
        formData.append('image_url', document.getElementById('banner-image-url').value);
    }

    const res = await fetch('/api/admin/banners', {
        method: 'POST',
        body: formData
    });
    if (res.ok) {
        alert('Banner added!');
    }
};

initAdmin();
