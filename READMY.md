#### Шпаргалка по Markdown

https://clck.ru/3AYPkY

#### Особенности сборки

1. Позволяет работать с TS и JS

#### Plagins

1. vite-plugin-purgecss

https://purgecss.com/configuration.html#options

2. @vheemstra/vite-plugin-imagemin

https://www.npmjs.com/package/@vheemstra/vite-plugin-imagemin

3. @vite-plugin-purgecss-updated-v5

https://npm.io/package/vite-plugin-purgecss-updated-v5

4. vite-plugin-purge

https://www.npmjs.com/package/vite-plugin-purge

#### Samples Code

```
content: [
  './src/**/*.html',
  './src/**/*.css',
  './src/**/*.js',
  './src/**/*.ts',
  './src/**/*.vue',
],
```

#### Используемые миксины

##### Media Scrin

```
@mixin media($max-width){
  $screen-width: str-replace($max-width + '', 'px');
  @media screen and (max-width: #{$screen-width}px) {
    @content;
  }
}

@include media(550) {
  font-size: 14px;
}
```

```
@mixin minMedia($min-width){
  $screen-width: str-replace($min-width + '', 'px');
  @media screen and (min-width: #{$screen-width}px) {
    @content;
  }
}

@include minMedia(550) {
  font-size: 18px;
}
```

##### Cтилизовать текст плейсхолдера

```
@mixin placeholderColor($color) {
  ::-webkit-input-placeholder {color: $color;}
  ::-moz-placeholder {color: $color;}
  :-moz-placeholder {color: $color;}
  :-ms-input-placeholder {color: $color;}
}
```

Пример использования: Замените $gray на ваш выбранный цвет

```
.my-input {
  @include placeholderColor($gray);
}
```

##### Задать размер квадратного элемента

```
@mixin square($size: 1em) {
  width: $size;
  height: $size;
}
```

Пример использования: Применит миксин с размером 2em

```
.another-element {
  @include square(2em);
}
```

##### Динамически генерирует CSS-стили на основе предоставленной карты классов

```
@mixin generate_styles($styles) {
  @each $class_name, $style_names in $styles {
    #{$class_name} {
      @each $style_name, $style_value in $style_names {
        #{$style_name}: #{$style_value};
      }
    }
  }
  @each $bp, $val in $grid-breakpoints {
    @if $bp != 'xs' {
      @each $class_name, $style_names in $styles {
        #{$class_name}--#{$bp} {
          @include minMedia($val) {
            @each $style_name, $style_value in $style_names {
              #{$style_name}: #{$style_value};
            }
          }
        }
      }
    }
  }
}
```

Типовое применение:

```
$styles: (
  ".display-block": (display: block),
  ".display-inline": (display: inline),
  ".display-table": (display: table),
  ".display-none": (display: none)
);

@include generate_styles($styles);
```

##### Пример базовых переменных

```

$brand: #df4f4f !default;

$text-color: (
  "white": #fff,
  "dark": #111,
  "accent": $brand,
  "error": #f00
) !default;

$theme-color: (
  "primary": #fff,
  "brand": $brand,
  "brand-hover": darken($brand, 10%),
  "brand-active": darken($brand, 20%),
) !default;
```

##### Примеры использования для переменных SCSS

```
.example {
  font-family: $text-font-stack; / Font-family
}
```

```
.button {
  &:hover{
    background-color: $theme-color("brand-hover"); / Цвет фона при наведении
  }
}
```

```
.warning {
  color: $text-color("warning"); / Цвет текста #FFF
  background-color: $theme-color("warning"); / Цвет фона #F00
}

```
