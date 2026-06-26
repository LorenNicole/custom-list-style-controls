<?php
/**
 * Plugin Name:       Custom List Style Controls
 * Plugin URI:        https://github.com/lorennicole316/custom-list-style-controls
 * Description:       Adds custom bullet and list-style controls to the native WordPress List block.
 * Version:           1.0.0
 * Requires at least: 6.5
 * Requires PHP:      7.4
 * Author:            Loren Nicole Simons
 * Author URI:        https://github.com/lorennicole316
 * License:           GPLv2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       custom-list-style-controls
 *
 * @package CustomListStyleControls
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue editor assets for the block editor.
 *
 * This plugin extends the existing core/list block, so we enqueue the
 * JavaScript directly into the block editor instead of registering a new block.
 */
function clsc_enqueue_block_editor_assets() {
	$asset_file = plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	if ( ! file_exists( $asset_file ) ) {
		return;
	}

	$asset = include $asset_file;

	wp_enqueue_script(
		'clsc-editor-script',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset['dependencies'],
		$asset['version'],
		true
	);

	wp_enqueue_style(
		'clsc-editor-style',
		plugins_url( 'build/index.css', __FILE__ ),
		array(),
		$asset['version']
	);
}
add_action( 'enqueue_block_editor_assets', 'clsc_enqueue_block_editor_assets' );

/**
 * Enqueue frontend styles.
 */
function clsc_enqueue_frontend_assets() {
	$asset_file = plugin_dir_path( __FILE__ ) . 'build/index.asset.php';

	$version = file_exists( $asset_file )
		? include $asset_file
		: array( 'version' => '1.0.0' );

	wp_enqueue_style(
		'clsc-frontend-style',
		plugins_url( 'build/style-index.css', __FILE__ ),
		array(),
		$version['version']
	);
}
add_action( 'wp_enqueue_scripts', 'clsc_enqueue_frontend_assets' );