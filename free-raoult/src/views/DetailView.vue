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
    </div>
</template>
  <script>
  import axios from 'axios'
  
  export default {
    data() {
        return {
            props: ['id'],
            article: {
              title: null,
              content: null,
              tags: null
            },
            layout: 'grid',
            sortKey: null,
            submitted: false,
        };
    },
    mounted() {
      this.getArticleReq();
    },
    methods: {
      showToast(level, title, content) {
        this.$toast.add({ severity: level, summary: title, detail: content, life: 3000 });
      },
      getArticleReq () {
          axios
            .get(import.meta.env.VITE_API_URL + '/dev/articles/' + id)
            .then(response => {
              this.article = response.data?.article;
            })
            .catch(error => console.log(error));
        }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  </style>