<template>
  <div>
    <HeadTop title="订单备注">
      <span slot="left" class="left-arrow" @click="$router.go(-1)">
        <i class="iconfont icon-arrow_left"></i>
      </span>
    </HeadTop>
    <div class="content" :style="`minHeight:${minHeight}px;`">
      <div class="quickPick">
        <div class="title">快速备注</div>
        <div class="notePick">
          <div class="spicy group">
            <div class="no item" @click="handleSpicy('不要辣')" :class="spicy == 'no' ? 'active' : ''" >不要辣</div>
            <div class="aLittle item" @click="handleSpicy('少点辣')" :class="spicy == 'aLitter' ? 'active' : ''" >少点辣</div>
            <div class="more item" @click="handleSpicy('多点辣')" :class="spicy == 'more' ? 'active' : ''" >多点辣</div>
          </div>
          <div
            class="item group"
            :class="{ active: parsley }"
            @click="toggleParsley('不要香菜')"
          >
            不要香菜
          </div>
          <div
            class="item group"
            :class="{ active: onions }"
            @click="toggleOnions('不要洋葱')"
          >
            不要洋葱
          </div>
          <div
            class="item group"
            :class="{ active: shallot }"
            @click="toggleShallot('多点葱')"
          >
            多点葱
          </div>
          <div
            class="item group"
            :class="{ active: vinegar }"
            @click="toggleVinegar('多点醋')"
          >
            多点醋
          </div>
          <div class="ice group">
            <div class="item" :class='ice == "no" ? "active" : ""' @click='handleIce("去冰")'>去冰</div>
            <div class="item" :class='ice == "aLitter" ? "active" : ""' @click='handleIce("少冰")'>少冰</div>
          </div>
        </div>
      </div>
      <div>
        <mt-field
          label="其他备注"
          placeholder="其他备注（可不填）"
          type="textarea"
          rows="4"
          v-model="note"
        ></mt-field>
      </div>
      <mt-button class="comfirmBtn" @click="handleComfirm">确定</mt-button>
    </div>
  </div>
</template>

<script>
import HeadTop from "../../components/HeaderTop/HeaderTop";
import {mapState} from 'vuex'
export default {
  data() {
    return {
      minHeight: 0,
      note: "",
      pickNote: [],
      parsley: false,
      onions: false,
      shallot: false,
      vinegar: false,
      ice:'',
      spicy:'',
      spicyPick:''
    };
  },
  components: { HeadTop },
  computed:{...mapState(['orderNote'])},
  methods: {
    toggleParsley(item) {
      if (!this.parsley) {
        this.pickNote.push(item);
      } else {
        this.pickNote.splice(this.pickNote.indexOf(item), 1);
      }
      this.parsley = !this.parsley;
    },
    toggleOnions(item) {
      if (!this.onions) {
        this.pickNote.push(item);
      } else {
        this.pickNote.splice(this.pickNote.indexOf(item), 1);
      }
      this.onions = !this.onions;
    },
    toggleShallot(item) {
      if (!this.shallot) {
        this.pickNote.push(item);
      } else {
        this.pickNote.splice(this.pickNote.indexOf(item), 1);
      }
      this.shallot = !this.shallot;
    },
    toggleVinegar(item) {
      if (!this.vinegar) {
        this.pickNote.push(item);
      } else {
        this.pickNote.splice(this.pickNote.indexOf(item), 1);
      }
      this.vinegar = !this.vinegar;
    },
    handleIce(item){
        this.pickNote.push(item);
        if (item=='少冰') {
            this.ice = 'aLitter'
            const index = this.pickNote.indexOf('去冰')
            if(index !== -1) this.pickNote.splice(index, 1);
        } else {
            this.ice = 'no'
            const index = this.pickNote.indexOf('少冰')
            if(index !== -1) this.pickNote.splice(index, 1);
        }
    },
    handleSpicy(item){
        const index = this.pickNote.indexOf(this.spicyPick)
        if (index !== -1) this.pickNote.splice(index,1)
        this.pickNote.push(item)
        this.spicyPick = item;
        if (item=='少点辣') {
            this.spicy = 'aLitter'
        } else if(item == '不要辣'){
            this.spicy = 'no'
        }else{
            this.spicy = 'more'
        }
    },
    handleComfirm(){
        const note = this.pickNote.join(',') + ' ' + this.note
        this.$store.dispatch('setOrderNote',note)
        this.$router.go(-1)
    }
  },
  mounted() {
    const deviceHeight = document.documentElement.clientHeight || document.body.clientHeight;
    this.minHeight = deviceHeight - 45;
    this.note = this.orderNote.split(' ')[1]
  },
};
</script>
<style lang='stylus' scoped>
.left-arrow {
  .iconfont {
    color: white;
    font-size: 20px;
    line-height: 45px;
    margin-left: 5px;
  }
}

.content {
  position: absolute;
  top: 45px;
  width: 100%;
  background-color: #eee;

  .quickPick {
    margin: 10px 0;
    padding: 20px;
    background-color: white;

    .title {
      font-size: 18px;
      margin-bottom: 10px;
    }

    .notePick {
      display: flex;
      flex-wrap: wrap;

      .group {
        display: flex;
        margin: 8px;
      }

      .item {
        border: 1px solid #02a774;
        padding: 8px;
        border-radius: 5px;

        &.active {
          background-color: #02a774;
          color: white;
        }
      }
    }
  }

  .comfirmBtn {
    width: 100%;
    border-radius: 5px;
    background-color: #02a774;
    color: white;
    margin-top: 10px;
  }
}
</style>