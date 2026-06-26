=== Custom List Style Controls ===
Contributors: lorennicole316
Tags: block editor, gutenberg, list, bullets, media library
Requires at least: 6.5
Tested up to: 6.8
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Adds custom bullet and list-style controls to the native WordPress List block.

== Description ==

Custom List Style Controls is a Gutenberg block editor extension that adds additional bullet and list-style controls to the native WordPress List block.

Instead of creating a replacement list block, this plugin enhances the existing core List block so editors can keep the normal Gutenberg list editing experience while gaining additional design options.

Features include:

* Adds a "List Bullet Style" panel to the native List block sidebar.
* Supports standard CSS list-style-type options such as disc, circle, square, decimal, alpha, and roman numerals.
* Supports a custom image bullet selected from the WordPress Media Library.
* Allows custom image bullet size control.
* Saves standard list styles as CSS classes.
* Applies matching editor and frontend styles.
* Uses the modern Gutenberg build workflow with @wordpress/scripts, React JSX, block editor filters, Inspector Controls, MediaUpload, and SCSS.

This plugin was built as a portfolio/demo plugin to demonstrate Gutenberg block extension development. It is intentionally small, focused, and separate from any private project-specific plugin code.

== Installation ==

1. Upload the `custom-list-style-controls` folder to the `/wp-content/plugins/` directory.
2. Activate the plugin through the Plugins screen in WordPress.
3. Open a page or post in the block editor.
4. Add or select a native WordPress List block.
5. In the block sidebar, open the "List Bullet Style" panel.
6. Choose a bullet style or select a custom image bullet from the Media Library.

== Frequently Asked Questions ==

= Does this plugin create a new list block? =

No. This plugin extends the native WordPress `core/list` block. Editors continue using the normal Gutenberg List block.

= Does the style apply to the whole list or each individual list item? =

The selected bullet style applies to the whole List block.

= Can I use an image as the list bullet? =

Yes. Choose "Custom image" from the Bullet style dropdown, then select an image from the WordPress Media Library.

= Does this plugin save inline styles? =

Standard list styles are saved as CSS classes. Custom image bullets use a CSS class plus CSS custom properties for the selected image URL and size.

= Is this plugin intended for production use? =

This plugin was built as a portfolio/demo plugin. It is useful as a focused Gutenberg example and may be adapted for production use after normal testing.

== Screenshots ==

1. List Bullet Style panel added to the native List block.
2. Standard bullet style selected in the block editor.
3. Custom image bullet selected from the Media Library.
4. Styled list displayed on the frontend.

== Changelog ==

= 1.0.0 =

* Initial release.
* Added List Bullet Style sidebar control for the native List block.
* Added standard CSS list-style-type options.
* Added custom image bullet support using the Media Library.
* Added bullet image size control.
* Added editor preview styles and frontend styles.

== Upgrade Notice ==

= 1.0.0 =
Initial release.
