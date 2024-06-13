<template>
  <div class="container">
    <h1>Gallerie Photos</h1>
    <div class="gallery-grid">
      <div v-for="(data, index) in datas" :key="index" class="gallery-item">
        <img :src="data.src" :alt="data.alt" @click="openModale(index)" class="img-gallery" />
      </div>
    </div>
    <div v-if="isModalOpen" class="modale-container">
      <span @click="closeModale" class="close-modale">&times;</span>
      <span @click="prevImage" class="prev-modale">&#10094;</span>
      <span @click="nextImage" class="next-modale">&#10095;</span>
      <div class="img-container-modale">
        <img :src="selectedImageSrc" :alt="selectedImageAlt" class="img-modale" />
      </div>
    </div>
    <p class="logout" @click="handleLogout">Déconnexion</p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import imageData from '../../datas.json'
import { logout } from "../services/auth"
import router from '../../index'

const datas = imageData.images.map((name) => ({
  src: `/images/${name}`,
  alt: name.replace(/\.\w+$/, '')
}))

const isModalOpen = ref(false)
const selectedImageSrc = computed(() => datas[selectedImageIndex.value].src)
const selectedImageAlt = computed(() => datas[selectedImageIndex.value].alt)
const selectedImageIndex = ref(0)

const openModale = (index) => {
  isModalOpen.value = true
  selectedImageIndex.value = index
}
const closeModale = () => {
  isModalOpen.value = false
}

const prevImage = () => {
  if (selectedImageIndex.value > 0) {
    selectedImageIndex.value--
  } else {
    // si on est sur la 1ere photo et qu'on fait précédent, on va a la dernière photo
    selectedImageIndex.value = datas.length - 1
  }
}

const nextImage = () => {
  if (selectedImageIndex.value < datas.length - 1) {
    selectedImageIndex.value++
  } else {
    // si on arrive a la fin du tableau de photos: on repart du debut
    selectedImageIndex.value = 0
  }
}

const handleLogout = () => {
   logout()
   router.push('/')
}

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: rgb(255, 255, 255);
  padding: 20px;
}

h1, .logout {
  font-family: 'Kaushan Script', sans-serif;
  font-size: 30px;
  margin-bottom: 40px;
  border: 0.5px solid rgb(0, 0, 0);
  border-radius: 20px;
  padding: 10px 20px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  padding: 16px;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 40px;
}

.gallery-item {
  width: 100%;
  padding-top: 75%;
  position: relative;
  overflow: hidden;
}

.img-gallery {
  /* width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 10px; */

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

/* responsive */
@media screen and (max-width: 1200px) {
  .gallery-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media screen and (max-width: 900px) {
  .gallery-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media screen and (max-width: 600px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media screen and (max-width: 400px) {
  .gallery-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}

.modale-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}
.close-modale,
.prev-modale,
.next-modale {
  position: absolute;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
}

.close-modale {
  top: 20px;
  right: 20px;
}

.prev-modale {
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
}

.next-modale {
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}

.img-container-modale {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.img-modale {
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
}
</style>
