<template>
  <div>
      <div class="content-section introduction">
          <div class="feature-intro">
              <h1>Liberez-Raoult</h1>
              <p>Retrouver ici des articles sans censure</p>
          </div>
          <!-- <AppDemoActions /> -->
      </div>
      <br>
      <div class="content-section implementation">
          <div class="card">
              <DataView v-model:filters="filters" :value="articles" :layout="layout" :paginator="true" :rows="9" :sortOrder="sortOrder" :sortField="sortField">
                  <template #header>
                      <div class="grid grid-nogutter">
                          <div class="col-6" style="text-align: left">
                              <Dropdown v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Trier par date" @change="onSortChange($event)" />
                          </div>
                          <span class="p-input-icon-left mr-2">
                            <i class="pi pi-search" />
                            <InputText
                              placeholder="Recherche..."
                            />
                          </span>
                          <Button @click="showNewArticleDialog = true" label="Nouvel article" icon="pi pi-plus" iconPos="right" />
                          <!-- <div class="col-6" style="text-align: right">
                              <DataViewLayoutOptions v-model="layout" />
                          </div> -->
                      </div>
                  </template>

                  <template #list="slotProps">
                      <div class="col-12">
                          <div class="product-list-item">
                              <!-- <img :src="'demo/images/product/' + slotProps.data.image" :alt="slotProps.data.title" /> -->
                              <div class="product-list-detail">
                                  <div class="product-name">{{ slotProps.data.title }}</div>
                                  <div class="product-description">{{ slotProps.data.content }}</div>
                                  <i class="pi pi-tag product-category-icon"></i>
                                  <span class="product-category" v-for="tag in slotProps.data.tags">
                                    {{ tag }}
                                  </span>
                              </div>
                              <div class="product-list-action">
                                  <!-- <span class="product-price">${{ slotProps.data.price }}</span> -->
                                  <Button @click="$router.push({ path: `/article/${slotProps.data.id}` })" icon="pi pi-shopping-cart" label="View"></Button>
                              </div>
                          </div>
                      </div>
                  </template>

                  <template #grid="slotProps">
                      <div class="col-12 md:col-4">
                          <div class="product-grid-item card">
                              <div class="product-grid-item-top">
                                  <div>
                                      <i class="pi pi-tag product-category-icon"></i>
                                      <span class="product-category" v-for="tag in slotProps.data.tags">
                                        {{ tag }},
                                      </span>
                                  </div>
                                  <!-- <span :class="'product-badge status-' + slotProps.data.inventoryStatus.toLowerCase()">{{ slotProps.data.inventoryStatus }}</span> -->
                              </div>
                              <div class="product-grid-item-content">
                                  <!-- <img :src="'demo/images/product/' + slotProps.data.image" :alt="slotProps.data.name" /> -->
                                  <img src="https://static.actu.fr/uploads/2022/08/sebastien-raoult.jpg"/>
                                  <div class="product-name">{{ slotProps.data.title }}</div>
                                  <div class="product-description">{{ slotProps.data.content }}</div>
                                  <!-- <Rating :modelValue="slotProps.data.rating" :readonly="true" :cancel="false"></Rating> -->
                              </div>
                              <div class="product-grid-item-bottom">
                                  <!-- <span class="product-price">${{ slotProps.data.price }}</span> -->
                                  <Button icon="pi pi-eye"></Button>
                              </div>
                          </div>
                      </div>
                  </template>
              </DataView>
          </div>
      </div>
  </div>
  <Dialog
    v-model:visible="showNewArticleDialog"
    :style="{width: '450px'}"
    header="Ajouter un nouvel article"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="title">Titre:</label>
      <InputText
        id="title"
        v-model="article.title"
        type="text"
        required="true"
        autofocus
      />
      <small
        v-if="submitted && !article.title"
        class="p-error"
      >Un titre est requis</small>
    </div>
    <div class="field">
      <label for="content">Contenu</label>
      <InputText
        v-model.trim="article.content"
        type="text"
        required="true"
      />
      <small
        v-if="submitted && !article.content"
        class="p-error"
      >Un contenu est requis</small>
    </div>
    <div class="field">
      <label for="tags">Tags</label>
      <Chips v-model="article.tags" separator="," :addOnBlur="true" :allowDuplicate="false" />
    </div>
    <template #footer>
      <Button
        label="Annuler"
        icon="pi pi-times"
        class="p-button-text"
        @click="showNewArticleDialog = false"
      />
      <Button
        label="Ajouter"
        icon="pi pi-check"
        class="p-button-text"
        @click="addNewArticleReq()"
      />
    </template>
  </Dialog>
</template>

<script>
import axios from 'axios'
import { FilterMatchMode, FilterOperator } from 'primevue/api';

export default {
  data() {
      return {
          articles: [],
          article: {
            title: null,
            content: null,
            tags: null
          },
          layout: 'grid',
          sortKey: null,
          submitted: false,
          showNewArticleDialog: false,
          sortOrder: null,
          sortField: null,
          sortOptions: [
              { label: 'Plus récent', value: '!date' },
              { label: 'Plus ancien', value: 'price' }
          ]
      };
  },
  mounted() {
    this.getArticlesReq();
  },
  methods: {
    showToast(level, title, content) {
      this.$toast.add({ severity: level, summary: title, detail: content, life: 3000 });
    },
    getArticlesReq () {
        axios
          .get(import.meta.env.VITE_API_URL + '/dev/articles')
          .then(response => {
            this.articles = response.data?.articles;
          })
          .catch(error => console.log(error));
      },
      addNewArticleReq(){
        this.submitted = true;
        if (this.article.title && this.article.content) {
          axios
            .post(import.meta.env.VITE_API_URL + '/dev/articles', this.article)
            .then(response => {
              if (response.status === 200) {
                this.showNewArticleDialog = false;
                this.getArticlesReq();
                this.showToast('success', 'Successful', `L'article a été ajouté avec succès`);
              } else {
                this.showToast('error', 'Error', 'Une erreur est survenue');
              }
            })
            .catch(error => {
                console.log(error);
                this.showToast('error', 'Error', 'Une erreur est survenue');
            });
          }
        },
      onSortChange(event) {
          const value = event.value.value;
          const sortValue = event.value;
          if (value.indexOf('!') === 0) {
              this.sortOrder = -1;
              this.sortField = value.substring(1, value.length);
              this.sortKey = sortValue;
          } else {
              this.sortOrder = 1;
              this.sortField = value;
              this.sortKey = sortValue;
          }
      }
  }
};
</script>

<style lang="scss" scoped>
.p-dropdown {
  width: 14rem;
  font-weight: normal;
}
.product-name {
  font-size: 1.5rem;
  font-weight: 700;
}
.product-description {
  margin: 0 0 1rem 0;
}
.product-category-icon {
  vertical-align: middle;
  margin-right: 0.5rem;
}
.product-category {
  font-weight: 600;
  vertical-align: middle;
}
::v-deep(.product-list-item) {
  display: flex;
  align-items: center;
  padding: 1rem;
  width: 100%;
  img {
      width: 150px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      margin-right: 2rem;
  }
  .product-list-detail {
      flex: 1 1 0;
  }
  .p-rating {
      margin: 0 0 0.5rem 0;
  }
  .product-price {
      font-size: 1.5rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      align-self: flex-end;
  }
  .product-list-action {
      display: flex;
      flex-direction: column;
  }
  .p-button {
      margin-bottom: 0.5rem;
  }
}
::v-deep(.product-grid-item) {
  margin: 0.5rem;
  border: 1px solid var(--surface-border);
  .product-grid-item-top,
  .product-grid-item-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
  }
  img {
      width: 75%;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
      margin: 2rem 0;
  }
  .product-grid-item-content {
      text-align: center;
  }
  .product-price {
      font-size: 1.5rem;
      font-weight: 600;
  }
}
@media screen and (max-width: 576px) {
  .product-list-item {
      flex-direction: column;
      align-items: center;
      img {
          width: 75%;
          margin: 2rem 0;
      }
      .product-list-detail {
          text-align: center;
      }
      .product-price {
          align-self: center;
      }
      .product-list-action {
          display: flex;
          flex-direction: column;
      }
      .product-list-action {
          margin-top: 2rem;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          width: 100%;
      }
  }
}
</style>