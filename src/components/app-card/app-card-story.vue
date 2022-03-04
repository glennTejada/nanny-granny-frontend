<template>
  <v-layout class="_layout-card-story">
    <v-flex xs12 fill-height>
      <v-container fill-height>
        <v-layout row wrap :reverse="reverse">
          <v-flex xs12 md6 lg6 d-flex align-end>
            <v-card flat light class="_layout-card-story--boby">
              <v-card-text class="pa-0">
                <slot></slot>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <!--DECORATE ELEMENTS-->
    <v-flex
      class="_layout-card-story--decorate"
      :class="{'decorate_reverse': reverse}"
      v-scrollanim="{ bEnt: 'before-fadeinup', enter: 'fadeinup', offsetBottom: 100 }"
    >
      <!--Image-->
      <v-flex class="_layout-card-story--decorate--image">
        <v-img :src="srcImage" :aspect-ratio="1" max-height="500" />
      </v-flex>
      <!--Pattern-->
      <slot name="pattern">
        <v-flex class="_layout-card-story--decorate--pattern" :class="[`__pattern-${pattern}`]">
          <div v-parallax="$helpers.getSpeedAnimationDown()" class="smooth-parallax">
            <app-svg-icon
              :name="`themes/profile/NG_BG-${pattern}`"
              :color="`${color} url(#svgicon_themes_profile_NG_BG-${pattern}_a)`"
            ></app-svg-icon>
          </div>
        </v-flex>
      </slot>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'app-card-story',
  props: {
    srcImage: String,
    color: {
      type: String,
      default: 'var(--yellow)'
    },
    pattern: {
      type: String,
      default: '05'
    },
    reverse: Boolean
  }
}
</script>

<style lang="stylus" scoped>
._layout-card-story {
  position: relative;
  flex-direction: column;

  @media (min-width: 960px) {
    height: 576px;
    margin-bottom: 77px;
  }

  &--decorate {
    max-width: 320px;
    position: relative;
    margin-left: auto;

    @media (min-width: 960px) {
      position: absolute;
      top: 24px;
      height: 500px;
      width: 50%;
      max-width: 680px;
      right: 0;
    }

    &--image {
      margin-left: auto;
      width: 80%;
      min-width: 200px;
      max-width: 200px;

      @media (min-width: 600px) {
        min-width: 320px;
        max-width: 320px;
      }

      @media (min-width: 960px) {
        position: absolute;
        bottom: 0;
        right: 0;
        max-width: 510px;
        z-index: 5;
      }
    }

    &--pattern {
      overflow: hidden;
      position: absolute;
      left: -122px;
      bottom: -80px;
      // bottom: -140px;
      width: 178px;
      height: 222px;

      .svg-icon {
        overflow: visible;
        width: 140px;
        height: 650px;
      }

      @media (min-width: 960px) {
        left: 0;
        top: 124px;
        // top: 184px;
        bottom: auto;
        height: 505px;
        min-width: 310px;
        z-index: 6;
      }

      &.__pattern-03 {
        width: 170px;
      }
    }

    &.decorate_reverse {
      @media (min-width: 960px) {
        right: auto;
        left: 0;
      }

      ._layout-card-story--decorate--image {
        right: auto;
        left: 0;
      }

      ._layout-card-story--decorate--pattern {
        @media (min-width: 960px) {
          transform: rotate(180deg);
          top: auto;
          bottom: -120px;
          width: 94%;
          height: 225px;
        }
      }
    }
  }

  &--boby {
    margin-bottom: 24px;

    @media (min-width: 600px) {
      margin-bottom: 0;
      padding-bottom: 140px;
      min-height: auto;
    }
  }
}

.moveup {
  transition: transform 1.5s ease-out;
  transform: translateY(-60px);
}
</style>
