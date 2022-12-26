<template>
    <div>
        <br>
        <div class="tags">
          Tags: 
          <span class="tags" v-for="tag in article.tags">
            <Tag :value="tag"></Tag>
          </span>
        </div>
        <br>
        <Panel :header="article.title">
          {{article.content}}
        </Panel>
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
            .get(import.meta.env.VITE_API_URL + '/dev/articles/' + this.$route.params.id)
            .then(response => {
              this.article = response.data;
            })
            .catch(error => console.log(error));
        }
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .tags {
    padding-bottom: 10px;
  }
  .p-tag {
    margin-left: 5px;
  }
  </style>