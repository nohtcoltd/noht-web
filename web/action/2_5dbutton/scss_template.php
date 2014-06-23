@font-face {
  font-family: "LigatureSymbols";
  src: url("../font/LigatureSymbols-2.11.eot");
  src: url("../font/LigatureSymbols-2.11.eot?#iefix") format("embedded-opentype"),
       url("../font/LigatureSymbols-2.11.woff") format("woff"),
       url("../font/LigatureSymbols-2.11.ttf") format("truetype"),
       url("../font/LigatureSymbols-2.11.svg#LigatureSymbols") format("svg");
  font-weight: normal;
  font-style: normal;
}

.icon-font {
  font-family: "LigatureSymbols";
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  -ms-text-rendering: optimizeLegibility;
  -o-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-font-smoothing: antialiased;
  -ms-font-smoothing: antialiased;
  -o-font-smoothing: antialiased;
  font-smoothing: antialiased;
  -webkit-font-feature-settings: "liga" 1, "dlig" 1;
  -moz-font-feature-settings: "liga=1, dlig=1";
  -ms-font-feature-settings: "liga" 1, "dlig" 1;
  -o-font-feature-settings: "liga" 1, "dlig" 1;
  font-feature-settings: "liga" 1, "dlig" 1;
}

@mixin transition($sec, $easing: linear) {
  -moz-transition: all $sec $easing;
  -webkit-transition: all $sec $easing;
  -o-transition: all $sec $easing;
  transition: all $sec $easing;
}

@mixin user-select($select: none) {
  -moz-user-select: $select;
  -webkit-user-select: $select;
  -ms-user-select: $select;
  user-select: $select;
}

@mixin general-button($label-size, $icon-size, $label-color, $popup-dist, $horizontal-padding, $vertical-padding, $radius, $speed, $button-color, $side-darkness, $darken: darken($button-color, $side-darkness)) {
  @include user-select;
  @include transition(0ms);
  display: inline-block;
  position: relative;
  top: 0px;
  border-radius: $radius;
  background-color: rgba($button-color, 1);
  cursor: pointer;
  text-decoration: none;
  .button-content {
    @include transition(0ms);
    display: table;
    border-radius: 0px 0px $radius $radius;
    padding: $horizontal-padding ($vertical-padding/2);
    color: $label-color;
    box-shadow: 0px 0px 0px 0px rgba($darken, 0);
    .button-text {
      display: table-cell;
      vertical-align: middle;
      text-decoration: none;
      padding: 0px ($vertical-padding/2);
      font-size: $label-size;
      @if $label-size < $icon-size {
        line-height:($icon-size / $label-size) + 0em;
      } @else {
        line-height: 1em;
      }
    }
    .icon-font {
      display: table-cell;
      vertical-align: middle;
      padding: 0px ($vertical-padding/2);
      font-size: $icon-size;
    }
  }
  &:before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: $radius;
    border-bottom: 0px solid rgba($darken, 0);
    background-color: rgba($button-color, 0);
  }
  &:hover {
    @include transition($speed, ease-in-out);
    background-color: rgba(lighten($button-color, 3%), 1);
    top: -$popup-dist;
    .button-content {
      @include transition($speed, ease-in-out);
      box-shadow: 0px $popup-dist 0px 0px rgba($darken, 1);
    }
    &:before {
      @include transition($speed, ease-in-out);
      border-bottom: $popup-dist solid rgba($darken, 0);
    }
  }
  &:active {
    @include transition(0ms);
    top: 0px;
    background-color: rgba(darken($button-color, 5%), 1);
    box-shadow: 0px($popup-dist / 5) + 1 0px 0px rgba($darken, 1) inset;
    .button-content {
      @include transition(0ms);
      box-shadow: 0px 0px 0px 0px rgba(darken($button-color, $side-darkness + 5%), 0);
    }
    &:before {
      @include transition(0ms);
      top: -$popup-dist;
      border-bottom: 0px solid rgba($darken, 0);
      padding-bottom: $popup-dist;
    }
  }
}

$label-size: <?php print($val['label_size']); ?>px;
$icon-size: <?php print($val['icon_size']); ?>px;
$label-color: <?php print($val['label_color']); ?>;
$popup-dist: <?php print($val['popup_dist']); ?>px;
$horizontal-padding: <?php print($val['horizontal_padding']); ?>px;
$vertical-padding: <?php print($val['vertical_padding']); ?>px;
$radius: <?php print($val['radius']); ?>px;
$speed: <?php print($val['speed']); ?>ms;
$button-color: <?php print($val['button_color']); ?>;
$side-darkness: <?php print($val['side_darkness']); ?>%;

.general-button {
  @include general-button($label-size, $icon-size, $label-color, $popup-dist, $horizontal-padding, $vertical-padding, $radius, $speed, $button-color, $side-darkness);
}
