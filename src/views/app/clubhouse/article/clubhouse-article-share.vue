<template>
    <social-sharing :title="item.name"
                    :description="item.description ? item.description.slice(0, 50) : ''"
                    inline-template>
        <div class="primary--text btn-link-share">
            <network network="facebook" class="btn-link">
                <app-svg-icon name="ui/NG_FACEBOOK"
                              color="var(--blue)"
                              width="20"
                              height="20"></app-svg-icon>
            </network>
            <network network="twitter" class="btn-link">
                <app-svg-icon name="ui/NG_TWITTER"
                              color="var(--blue)"
                              width="20"
                              height="20"></app-svg-icon>
            </network>
            <network network="linkedin" class="btn-link">
                <app-svg-icon name="ui/NG_LINKEDIN"
                              color="var(--blue)"
                              width="16"
                              height="16"></app-svg-icon>
            </network>
            <network network="googleplus" class="btn-link">
                <app-svg-icon name="ui/NG_GOOGLE_+"
                              color="var(--blue)"
                              width="22"
                              height="22"></app-svg-icon>
            </network>
            <network network="email" class="btn-link">
                <app-svg-icon name="brand/NG_EMAIL_FILLED"
                              color="var(--blue)"
                              width="22"
                              height="22"></app-svg-icon>
            </network>
        </div>
    </social-sharing>
</template>

<script>
  import Article from '@/models/ArticleClass'
  import {IMAGE_BASE_URL} from '@/config/constants'

  export default {
    name: 'clubhouse-article-share',
    props: {
      item: {
        type: Article,
        required: true
      }
    },
    computed: {
      share_path (id) {
        return IMAGE_BASE_URL + 'clubhouse/article/' + id
      }
    }
  }
</script>

<style lang="stylus">
    .btn-link-share
        display flex
        flex-direction row
        flex-wrap wrap
        > .btn-link
            display flex
            align-items center
            justify-content center
            width 35px
            height 35px
            background-color var(--sand)
            border-radius 50%
            cursor pointer
            margin-right 10px
            margin-top 10px
</style>
