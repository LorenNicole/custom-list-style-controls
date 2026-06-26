/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	RangeControl,
	SelectControl,
} from '@wordpress/components';

/**
 * Styles
 */
import './editor.scss';
import './style.scss';

const TARGET_BLOCK = 'core/list';
const CUSTOM_IMAGE_STYLE = 'custom-image';

const LIST_STYLE_OPTIONS = [
	{
		label: __( 'Default', 'custom-list-style-controls' ),
		value: '',
	},
	{
		label: __( 'Disc', 'custom-list-style-controls' ),
		value: 'disc',
	},
	{
		label: __( 'Circle', 'custom-list-style-controls' ),
		value: 'circle',
	},
	{
		label: __( 'Square', 'custom-list-style-controls' ),
		value: 'square',
	},
	{
		label: __( 'Decimal', 'custom-list-style-controls' ),
		value: 'decimal',
	},
	{
		label: __( 'Decimal leading zero', 'custom-list-style-controls' ),
		value: 'decimal-leading-zero',
	},
	{
		label: __( 'Lower alpha', 'custom-list-style-controls' ),
		value: 'lower-alpha',
	},
	{
		label: __( 'Upper alpha', 'custom-list-style-controls' ),
		value: 'upper-alpha',
	},
	{
		label: __( 'Lower roman', 'custom-list-style-controls' ),
		value: 'lower-roman',
	},
	{
		label: __( 'Upper roman', 'custom-list-style-controls' ),
		value: 'upper-roman',
	},
	{
		label: __( 'None', 'custom-list-style-controls' ),
		value: 'none',
	},
	{
		label: __( 'Custom image', 'custom-list-style-controls' ),
		value: CUSTOM_IMAGE_STYLE,
	},
];

/**
 * Add custom attributes to the core List block.
 *
 * @param {Object} settings Block settings.
 * @param {string} name     Block name.
 *
 * @return {Object} Updated block settings.
 */
function addListStyleAttributes( settings, name ) {
	if ( name !== TARGET_BLOCK ) {
		return settings;
	}

	return {
		...settings,
		attributes: {
			...settings.attributes,
			clscListStyle: {
				type: 'string',
				default: '',
			},
			clscBulletImageId: {
				type: 'number',
				default: 0,
			},
			clscBulletImageUrl: {
				type: 'string',
				default: '',
			},
			clscBulletImageAlt: {
				type: 'string',
				default: '',
			},
			clscBulletSize: {
				type: 'number',
				default: 18,
			},
		},
	};
}

addFilter(
	'blocks.registerBlockType',
	'custom-list-style-controls/add-list-style-attributes',
	addListStyleAttributes
);

/**
 * Add controls to the List block sidebar.
 */
const withListStyleControls = createHigherOrderComponent(
	( BlockEdit ) => {
		return ( props ) => {
			const {
				name,
				attributes,
				setAttributes,
				isSelected,
			} = props;

			if ( name !== TARGET_BLOCK ) {
				return <BlockEdit { ...props } />;
			}

			const {
				clscListStyle,
				clscBulletImageId,
				clscBulletImageUrl,
				clscBulletSize,
			} = attributes;

			const isCustomImage = clscListStyle === CUSTOM_IMAGE_STYLE;

			return (
				<>
					<BlockEdit { ...props } />

					{ isSelected && (
						<InspectorControls>
							<PanelBody
								title={ __( 'List Bullet Style', 'custom-list-style-controls' ) }
								initialOpen={ true }
							>
								<SelectControl
									label={ __( 'Bullet style', 'custom-list-style-controls' ) }
									value={ clscListStyle }
									options={ LIST_STYLE_OPTIONS }
									onChange={ ( value ) => {
										const nextAttributes = {
											clscListStyle: value,
										};

										if ( value !== CUSTOM_IMAGE_STYLE ) {
											nextAttributes.clscBulletImageId = 0;
											nextAttributes.clscBulletImageUrl = '';
											nextAttributes.clscBulletImageAlt = '';
										}

										setAttributes( nextAttributes );
									} }
								/>

								{ isCustomImage && (
									<>
										<MediaUploadCheck>
											<MediaUpload
												onSelect={ ( media ) => {
													setAttributes( {
														clscBulletImageId: media.id,
														clscBulletImageUrl: media.url,
														clscBulletImageAlt:
															media.alt || '',
													} );
												} }
												allowedTypes={ [ 'image' ] }
												value={ clscBulletImageId }
												render={ ( { open } ) => (
													<div className="clsc-media-control">
														{ clscBulletImageUrl && (
															<div className="clsc-media-preview">
																<img
																	src={ clscBulletImageUrl }
																	alt=""
																/>
															</div>
														) }

														<Button
															variant="secondary"
															onClick={ open }
														>
															{ clscBulletImageUrl
																? __( 'Replace bullet image', 'custom-list-style-controls' )
																: __( 'Select bullet image', 'custom-list-style-controls' ) 
															}
														</Button>
													</div>
												) }
											/>
										</MediaUploadCheck>

										{ clscBulletImageUrl && (
											<Button
												variant="link"
												isDestructive
												onClick={ () =>
													setAttributes( {
														clscBulletImageId: 0,
														clscBulletImageUrl: '',
														clscBulletImageAlt: '',
													} )
												}
											>
												{ __( 'Remove bullet image', 'custom-list-style-controls' ) }
											</Button>
										) }

										<RangeControl
											label={ __( 'Bullet image size', 'custom-list-style-controls' ) }
											value={ clscBulletSize }
											onChange={ ( value ) =>
												setAttributes( {
													clscBulletSize: value,
												} )
											}
											min={ 10 }
											max={ 48 }
											step={ 1 }
										/>
									</>
								) }
							</PanelBody>
						</InspectorControls>
					) }
				</>
			);
		};
	},
	'withListStyleControls'
);

addFilter(
	'editor.BlockEdit',
	'custom-list-style-controls/with-list-style-controls',
	withListStyleControls
);

/**
 * Add custom class and CSS variables to the saved List block markup.
 *
 * @param {Object} extraProps Additional block props.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Block attributes.
 *
 * @return {Object} Updated props.
 */
function addListStyleProps( extraProps, blockType, attributes ) {
	if ( blockType.name !== TARGET_BLOCK ) {
		return extraProps;
	}

	const {
		clscListStyle,
		clscBulletImageUrl,
		clscBulletSize,
	} = attributes;

	if ( ! clscListStyle ) {
		return extraProps;
	}

	const customClass = `has-clsc-list-style-${ clscListStyle }`;

	const updatedProps = {
		...extraProps,
		className: extraProps.className
			? `${ extraProps.className } ${ customClass }`
			: customClass,
	};

	if (
		clscListStyle === CUSTOM_IMAGE_STYLE &&
		clscBulletImageUrl
	) {
		updatedProps.style = {
			...extraProps.style,
			'--clsc-bullet-image': `url("${ clscBulletImageUrl }")`,
			'--clsc-bullet-size': `${ clscBulletSize || 18 }px`,
		};
	}

	return updatedProps;
}

addFilter(
	'blocks.getSaveContent.extraProps',
	'custom-list-style-controls/add-list-style-props',
	addListStyleProps
);

/**
 * Add preview class and CSS variables inside the editor.
 *
 * The save filter updates the saved frontend markup, but it does not update
 * the live editor preview. This filter adds the same bullet style class to
 * the List block in the editor.
 */
const withListStyleEditorPreview = createHigherOrderComponent(
	( BlockListBlock ) => {
		return ( props ) => {
			if ( props.name !== TARGET_BLOCK ) {
				return <BlockListBlock { ...props } />;
			}

			const {
				clscListStyle,
				clscBulletImageUrl,
				clscBulletSize,
			} = props.attributes;

			if ( ! clscListStyle ) {
				return <BlockListBlock { ...props } />;
			}

			const customClass = `has-clsc-list-style-${ clscListStyle }`;

			const className = props.className
				? `${ props.className } ${ customClass }`
				: customClass;

			const wrapperProps = {
				...props.wrapperProps,
			};

			if (
				clscListStyle === CUSTOM_IMAGE_STYLE &&
				clscBulletImageUrl
			) {
				wrapperProps.style = {
					...props.wrapperProps?.style,
					'--clsc-bullet-image': `url("${ clscBulletImageUrl }")`,
					'--clsc-bullet-size': `${ clscBulletSize || 18 }px`,
				};
			}

			return (
				<BlockListBlock
					{ ...props }
					className={ className }
					wrapperProps={ wrapperProps }
				/>
			);
		};
	},
	'withListStyleEditorPreview'
);

addFilter(
	'editor.BlockListBlock',
	'custom-list-style-controls/with-list-style-editor-preview',
	withListStyleEditorPreview
);
