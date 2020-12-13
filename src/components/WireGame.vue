<script>
import shuffle from 'lodash/shuffle'

export default {
  data() {
    return {
      userWires: [
        {
          label: 'red'
        },
        {
          label: 'blue'
        },
        {
          label: 'limegreen'
        },
        {
          label: 'cyan'
        }
      ],
      matchStatus: [false, false, false, false],
      userSelection: {
        selectedWire: 'black',
        matchedWire: 'white'
      },
      wireLines: [],
      drawWire: {
        display: false,
        label: null,
        stroke: null,
        x1: 0,
        y1: 0,
        offsetLeft: 0,
        offsetTop: 0
      },
      mousePosition: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    correctWires() {
      return shuffle([
        {
          label: 'limegreen'
        },
        {
          label: 'cyan'
        },
        {
          label: 'blue'
        },
        {
          label: 'red'
        }
      ])
    }
  },
  watch: {
    matchStatus: {
      handler(status) {
        if (!status.includes(false)) {
          this.$emit('mini-game-won', 'wire-game')
        }
      },
      deep: true
    }
  },
  mounted() {
    window.addEventListener('mousemove', this.handleMouseMove)
  },
  unmounted() {
    window.removeEventListener('mousemove', this.handleMouseMove)
  },
  methods: {
    handleMouseMove($event) {
      this.mousePosition.x = $event.x
      this.mousePosition.y = $event.y
    },
    checkWireColors() {
      const { selectedWire, matchedWire } = this.userSelection

      if (selectedWire === matchedWire) {
        const selectedIndex = this.userWires.findIndex(
          wire => wire.label === selectedWire
        )

        this.matchStatus[selectedIndex] = true
        this.wireLines.push({
          ...this.drawWire,
          x2: this.mousePosition.x - this.drawWire.offsetLeft,
          y2: this.mousePosition.y - this.drawWire.offsetTop
        })
      }

      this.drawWire.display = false
    },
    registerMatchColor(wire) {
      this.userSelection.matchedWire = wire.label
    },
    registerWireColor($event, wire) {
      this.userSelection.selectedWire = wire.label

      const wireIndex = this.userWires.findIndex(userWire => userWire === wire)
      const itemOffsetLeft = $event.target.offsetLeft
      const parentOffsetLeft = $event.target.offsetParent.offsetLeft
      const itemWidth = $event.target.clientWidth
      const itemOffsetTop = $event.target.offsetTop
      const parentOffsetTop = $event.target.offsetParent.offsetTop

      const offsetLeft = itemOffsetLeft + parentOffsetLeft + itemWidth
      const offsetTop = itemOffsetTop + parentOffsetTop - 20 * wireIndex

      this.drawWire = {
        display: true,
        label: wire.label,
        stroke: wire.label,
        x1: 0,
        y1: 11 * wireIndex + 11 * (wireIndex + 1),
        offsetLeft: offsetLeft,
        offsetTop: offsetTop
      }
    },
    findCorrectWire(wire) {
      return this.correctWires.findIndex(
        correctWire => correctWire.label === wire.label
      )
    }
  }
}
</script>

<template>
  <div>
    <div :class="$style.wireboard">
      <div :class="$style.panel">
        <ul>
          <li v-for="wire in userWires" :key="`user-${wire.label}`">
            <div
              @mousedown="registerWireColor($event, wire)"
              :style="`background-color: ${wire.label};`"
              :id="`wire-${wire.label}`"
            >
              {{ wire.label }}
            </div>
          </li>
        </ul>
      </div>

      <div :class="$style.panel" style="flex: 1;">
        <svg :class="$style.svg">
          <line
            v-show="drawWire.display"
            :key="`wire-line-draw`"
            :class="$style.line"
            :x1="drawWire.x1"
            :y1="drawWire.y1"
            :x2="mousePosition.x - drawWire.offsetLeft"
            :y2="mousePosition.y - drawWire.offsetTop"
            :stroke="drawWire.stroke"
          />
          <line
            v-for="wire in wireLines"
            :key="`wire-line-${wire.label}`"
            :class="$style.line"
            :x1="wire.x1"
            :y1="wire.y1"
            :x2="wire.x2"
            :y2="wire.y2"
            :stroke="wire.stroke"
          />
        </svg>
      </div>

      <div :class="$style.panel">
        <ul>
          <li
            v-for="wire in correctWires"
            :key="`user-${wire.label}`"
            :style="`background-color: ${wire.label}`"
            @mouseenter="registerMatchColor(wire)"
            @mouseup="checkWireColors"
            :id="`wire-${wire.label}-end`"
          >
            {{ wire.label }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style module>
.svg {
  width: 100%;
}

.line {
  stroke-width: 5px;
}

.wireboard {
  display: flex;
}

.panel ul,
.panel li {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
