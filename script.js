window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        }, 300);
    }
});

document.addEventListener('DOMContentLoaded', () => {

    /* --- İMLEÇ MOTORU --- */
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const cursor = document.getElementById('zest-cursor');

    if (cursor && !isTouchDevice) {
        // Sadece bilgisayarlarda CSS'teki display:block tetiklenir ve standart fare gizlenir
        document.body.classList.add('custom-cursor-active');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Hover Efektleri (Her türlü link ve buton için)
        document.body.addEventListener('mouseover', (e) => {
            const target = e.target;
            if (target.tagName) {
                const tag = target.tagName.toLowerCase();
                if (tag === 'a' || tag === 'button' || tag === 'input' ||
                    target.classList.contains('hover-target') ||
                    target.closest('.menu-card') ||
                    target.classList.contains('filter-btn') ||
                    target.classList.contains('sub-filter-btn') ||
                    target.classList.contains('dietary-btn')) {
                    cursor.classList.add('hovering');
                }
            }
        });

        document.body.addEventListener('mouseout', (e) => {
            cursor.classList.remove('hovering');
        });
    }

    /* ---  MENÜ VERİSİ VE ETİKETLER --- */
    const tagMap = {
        'vegan': { label: 'Vegan', class: 'vgn' },
        'glutensiz': { label: 'Glutensiz', class: 'glt' },
        'vejeteryan': { label: 'Vejeteryan', class: 'vjt' },
        'aci': { label: 'Acı', class: 'aci' }
    };

    const categoryLabels = {
        'kokteyl': 'İmza Kokteyl',
        'sarap': 'Premium Şarap',
        'viski': 'Viski Seçkisi',
        'alkolsuz': 'Alkolsüz İçecek',
        'alkollu': 'Alkollü İçecek',
        'apetizer': 'Apetizer',
        'ana-yemek': 'Ana Yemek',
        'tatli': 'Tatlı',
        'all': 'Seçki'
    };

    const menuData = [
        // APETİZER
        { title: "Smoked Wagyu Carpaccio", price: "680₺", category: "apetizer", img: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=500", desc: "Kömür isli Wagyu eti, parmesan çıtırı ve trüf mayonez.", tags: ["glutensiz"] },
        { title: "Truffle Burrata", price: "420₺", category: "apetizer", img: "https://images.unsplash.com/photo-1608897013039-887f214b985c?q=80&w=500", desc: "Taze İtalyan burrata peyniri, sızma zeytinyağı, fesleğen ve trüf mantarı.", tags: ["vejeteryan", "glutensiz"] },
        { title: "Oyster Selection", price: "550₺", category: "apetizer", img: "https://images.unsplash.com/photo-1544378730-8b5104b288da?q=80&w=500", desc: "Taze istiridye tabağı, mignonette sos ve limon ile.", tags: ["glutensiz"] },
        { title: "Spicy Tuna Tartare", price: "590₺", category: "apetizer", img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=500", desc: "Taze orkinos, avokado kreması, chili biberi ve susam yağı.", tags: ["aci", "glutensiz"] },
        { title: "Edamame Truffle", price: "250₺", category: "apetizer", img: "https://images.unsplash.com/photo-1515516969-d4008cc6241a?q=80&w=500", desc: "Buharda pişmiş edamame, trüf tuzu ve susam ile.", tags: ["vegan", "glutensiz"] },

        // ANA YEMEKLER
        { title: "Vegan Truffle Pasta", price: "510₺", category: "ana-yemek", img: "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=500", desc: "El yapımı vegan makarna, taze trüf mantarı ve kaju kreması.", tags: ["vegan", "vejeteryan"] },
        { title: "Roasted Spicy Octopus", price: "720₺", category: "ana-yemek", img: "https://images.unsplash.com/photo-1533614767277-339843b9d12d?q=80&w=500", desc: "Kırmızı chili soslu ahtapot bacağı, taze otlar.", tags: ["aci", "glutensiz"] },
        { title: "Dry Aged Ribeye", price: "1250₺", category: "ana-yemek", img: "https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=500", desc: "28 gün dinlendirilmiş dana antrikot, deniz tuzu ve biberiye yağı eşliğinde.", tags: ["glutensiz"] },
        { title: "Glazed Duck Breast", price: "890₺", category: "ana-yemek", img: "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=500", desc: "Nar ekşisi ile sırlanmış ördek göğsü, kereviz püresi.", tags: ["glutensiz"] },
        { title: "Herb Crusted Salmon", price: "640₺", category: "ana-yemek", img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=500", desc: "Taze otlarla kaplanmış fırınlanmış Norveç somonu, kuşkonmaz ile.", tags: ["glutensiz"] },

        // TATLILAR
        { title: "Volcanic Chocolate", price: "320₺", category: "tatli", img: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=500", desc: "Akışkan bitter çikolata ve vanilya çubuğu ile yapılmış dondurma.", tags: ["vejeteryan"] },
        { title: "Vegan Berry Tart", price: "280₺", category: "tatli", img: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=500", desc: "Badem unlu taban üzerinde taze orman meyveleri ve şekersiz krema.", tags: ["vegan", "glutensiz"] },
        { title: "Matcha Tiramisu", price: "350₺", category: "tatli", img: "https://images.unsplash.com/photo-1571115177098-24edf3ae3c85?q=80&w=500", desc: "Geleneksel İtalyan lezzetinin premium Japon matcha ile yorumu.", tags: ["vejeteryan"] },

        // ALKOLSÜZ İÇECEKLER
        { title: "Artisan Kombucha", price: "180₺", category: "alkolsuz", img: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=500", desc: "Zencefil ve hibiskus ile fermente edilmiş probiyotik içecek.", tags: ["vegan", "glutensiz"] },
        { title: "Matcha Detoks", price: "210₺", category: "alkolsuz", img: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=500", desc: "Premium Japon matcha, hindistan cevizi sütü ve agave şurubu.", tags: ["vegan", "glutensiz"] },
        { title: "Virgin Berry Mojito", price: "230₺", category: "alkolsuz", img: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=500", desc: "Taze orman meyveleri, nane yaprakları ve lime suyu.", tags: ["vegan", "glutensiz"] },
        { title: "Nitro Cold Brew", price: "160₺", category: "alkolsuz", img: "https://images.unsplash.com/photo-1461023058943-0708e52235eb?q=80&w=500", desc: "Azot gazıyla demlenmiş kremamsı dokuda soğuk kahve.", tags: ["vegan", "glutensiz"] },

        // ALKOLLÜ İÇECEKLER
        { title: "Classic Negroni", price: "420₺", category: "alkollu", subCategory: "kokteyl", img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=500", desc: "Cin, Campari ve özel İtalyan Vermutunun meşe fıçıda dinlendirilmiş hali.", tags: [] },
        { title: "Smoked Old Fashioned", price: "450₺", category: "alkollu", subCategory: "kokteyl", img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=500", desc: "Bourbon viski, angostura bitter ve kiraz isinde tütsülenmiş portakal kabuğu.", tags: ["vegan"] },
        { title: "Spicy Margarita", price: "410₺", category: "alkollu", subCategory: "kokteyl", img: "https://images.unsplash.com/photo-1582226224225-24021200fa82?q=80&w=500", desc: "Jalapeno infüzyonlu tekila, taze lime ve agave.", tags: ["aci", "vegan"] },
        { title: "Château Margaux 2015", price: "9500₺", category: "alkollu", subCategory: "sarap", img: "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=500", desc: "Kırmızı Orman meyveleri ve zarif tanen yapısı ile Fransız klasiği (Şişe).", tags: ["vegan", "glutensiz"] },
        { title: "Pinot Noir Reserve", price: "680₺", category: "alkollu", subCategory: "sarap", img: "https://images.unsplash.com/photo-1559564101-eb47180415a7?q=80&w=500", desc: "Kiraz ve toprak notaları barındıran gövdeli kırmızı şarap (Kadeh).", tags: ["vegan", "glutensiz"] },
        { title: "Macallan 18 Years", price: "1850₺", category: "alkollu", subCategory: "viski", img: "https://images.unsplash.com/photo-1527281400683-1aae777175f8?q=80&w=500", desc: "Kuru meyve ve zencefil notaları, meşe fıçı (Kadeh).", tags: ["vegan"] },
        { title: "Lagavulin 16 Years", price: "1100₺", category: "alkollu", subCategory: "viski", img: "https://images.unsplash.com/photo-1563821033282-58e1cdd1dbb7?q=80&w=500", desc: "Yoğun is, deniz tuzu ve turba karakterli Islay viskisi (Kadeh).", tags: ["vegan"] }
    ];

    /* --- FİLTRE VE RENDER MOTORU --- */
    const menuGrid = document.getElementById('menu-grid-content');
    const noResultsMsg = document.getElementById('no-results');
    const alkolSubFilters = document.getElementById('alkol-sub-filters');

    if (menuGrid) {
        let currentCategory = 'all';
        let currentSubCategory = 'all';
        let activeTags = [];
        let searchQuery = '';

        function renderMenu(itemsToRender) {
            menuGrid.innerHTML = '';

            if (itemsToRender.length === 0) {
                if(noResultsMsg) noResultsMsg.style.display = 'block';
                return;
            } else {
                if(noResultsMsg) noResultsMsg.style.display = 'none';
            }

            itemsToRender.forEach((item) => {
                const card = document.createElement('div');
                card.className = 'menu-card hover-target';

                const badgesHtml = item.tags ? item.tags.map(tag => {
                    const t = tagMap[tag];
                    return t ? `<span class="badge ${t.class}">${t.label}</span>` : '';
                }).join('') : '';

                const catKey = item.subCategory ? item.subCategory : item.category;
                const displayCategory = categoryLabels[catKey] || 'Lezzet';

                card.innerHTML = `
                    <img src="${item.img}" class="menu-img">
                    <div class="menu-info">
                        <span class="mini-category">${displayCategory}</span>
                        <h3>${item.title}</h3>
                        <p class="menu-desc" style="display:none; color: var(--text-white); margin-top: 10px;">${item.desc}</p>
                        <div class="badges">${badgesHtml}</div>
                        <span class="menu-price">${item.price}</span>
                    </div>
                `;

                card.onclick = () => {
                    const d = card.querySelector('.menu-desc');
                    d.style.display = d.style.display === 'none' ? 'block' : 'none';
                };

                menuGrid.appendChild(card);
            });
        }

        function applyFilters() {
            const filtered = menuData.filter(item => {
                const matchCategory = (currentCategory === 'all' || item.category === currentCategory);
                let matchSub = true;
                if (currentCategory === 'alkollu' && currentSubCategory !== 'all') {
                    matchSub = (item.subCategory === currentSubCategory);
                }
                const searchLower = searchQuery.toLowerCase();
                const matchSearch = (searchQuery === '') ||
                                    item.title.toLowerCase().includes(searchLower) ||
                                    item.desc.toLowerCase().includes(searchLower);

                const matchTags = activeTags.every(tag => item.tags && item.tags.includes(tag));

                return matchCategory && matchSub && matchSearch && matchTags;
            });

            renderMenu(filtered);
        }

        // Ana Kategori Eventleri
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.filter-btn.active').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCategory = btn.dataset.cat;

                if (currentCategory === 'alkollu') {
                    if(alkolSubFilters) alkolSubFilters.style.display = 'flex';
                } else {
                    if(alkolSubFilters) alkolSubFilters.style.display = 'none';
                    currentSubCategory = 'all';
                    document.querySelectorAll('.sub-filter-btn.active').forEach(b => b.classList.remove('active'));
                    const allSub = document.querySelector('.sub-filter-btn[data-subcat="all"]');
                    if(allSub) allSub.classList.add('active');
                }
                applyFilters();
            });
        });

        // Alt Kategori Eventleri
        document.querySelectorAll('.sub-filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.sub-filter-btn.active').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentSubCategory = btn.dataset.subcat;
                applyFilters();
            });
        });

        // Diyet Filtre Eventleri
        document.querySelectorAll('.dietary-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                const tag = btn.dataset.tag;
                if(btn.classList.contains('active')) {
                    if(!activeTags.includes(tag)) activeTags.push(tag);
                } else {
                    activeTags = activeTags.filter(t => t !== tag);
                }
                applyFilters();
            });
        });

        // Arama Kutusu Eventi
        const searchInput = document.getElementById('menu-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.trim();
                applyFilters();
            });
        }

        applyFilters();
    }
});
