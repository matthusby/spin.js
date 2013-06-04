/*
Different possible ways of creating a spinner
$("#el").spin(); // Produces default Spinner
$("#el").spin("small"); // Produces a 'small' Spinner
$("#el").spin("large", "white"); // Produces a 'large' Spinner in white (or any valid CSS color).
$("#el").spin({ ... }); // Produces a Spinner using your custom settings.
$("#el").spin("small-right"); // Pin the small spinner to the right edge
$("#el").spin("{small, medium, large}-{left, right, top, bottom}"); // All options for where to pin
$("#el").spin(false); // Kills the spinner.
*/

function createSpinner( options, colors ) {
	var $spinnerHarness = $('<div class="spinner-test-harness" />');
	$spinnerHarness.appendTo( 'body').spin(options, colors);
	return $spinnerHarness.find( '.spinner' );
}

function teardownSpinners() {
	$('.spinner-test-harness').remove();
}

function testSpinnerPosition( $spinner, position ) {
	var positionToQuery = position,
		spinnerSize = 30,
		valueToCompare;
	if( position === 'right' ) {
		positionToQuery = 'left';
		valueToCompare = $(window).width();
	}
	if( position === 'bottom' ) {
		positionToQuery = 'top';
		valueToCompare = $(window).height();
	}
	var pixels = parseInt( $spinner.css( positionToQuery ), 10);
	if( position === 'top' || position === 'left' ) {
		return pixels < spinnerSize;
	}
	if( position === 'right' || position === 'bottom' ) {
		return pixels > valueToCompare - spinnerSize;
	}
}

function testSpinnerSize( $spinner, height ) {
	return $spinner.find( ' > div > div' ).height() == height;
}

function testSpinnerColor( $spinner, color ) {
	return $spinner.find( ' > div > div' ).css( 'backgroundColor' ) == color;
}

module('tests for jquery.spin');
test( "test sizes", function() {
	expect(3);
	//it would be really nice to be able to get these numbers out of the plugin
	ok( testSpinnerSize( createSpinner( 'small' ), 2), "small spinners work" );
	ok( testSpinnerSize( createSpinner( 'medium' ), 3), "medium spinners work" );
	ok( testSpinnerSize( createSpinner( 'large' ), 4), "large spinners work" );
	teardownSpinners();
});
test( "test positions", function() {
	expect(4);
	ok( testSpinnerPosition( createSpinner( 'small-top' ), 'top' ), "top positioned spinners work" );
	ok( testSpinnerPosition( createSpinner( 'small-right' ), 'right' ), "right positioned spinners work" );
	ok( testSpinnerPosition( createSpinner( 'small-bottom' ), 'bottom' ), "bottom positioned spinners work" );
	ok( testSpinnerPosition( createSpinner( 'small-left' ), 'left' ), "left positioned spinners work" );
	teardownSpinners();
});

test( "test colors", function() {
	expect(3);
	ok( testSpinnerColor( createSpinner( 'left', 'red' ), "rgb(255, 0, 0)" ), "red" );
	ok( testSpinnerColor( createSpinner( 'left', 'white' ), "rgb(255, 255, 255)" ), "white" );
	ok( testSpinnerColor( createSpinner( 'left', '#00f' ), "rgb(0, 0, 255)" ), "blue" );
	teardownSpinners();
});
test( "test size and position", function() {
	expect(3);
	var smallLeft = createSpinner( 'small-left' );
	ok( testSpinnerSize( smallLeft, 2 ) && testSpinnerPosition( smallLeft, 'left' ), 'small left spinners work');
	var mediumTop = createSpinner( 'medium-top' );
	ok( testSpinnerSize( mediumTop, 3 ) && testSpinnerPosition( mediumTop, 'top' ), 'medium top spinners work');
	var largeBottom = createSpinner( 'large-bottom' );
	ok( testSpinnerSize( largeBottom, 4 ) && testSpinnerPosition( largeBottom, 'bottom' ), 'large right spinners work');
	teardownSpinners();
});
test( "test size and color", function() {
	expect(3);
	var smallRed = createSpinner( 'small', 'red' );
	ok( testSpinnerSize( smallRed, 2 ) && testSpinnerColor( smallRed, "rgb(255, 0, 0)"), "small red spinners work" );
	var mediumBlue = createSpinner( 'medium', 'blue' );
	ok( testSpinnerSize( mediumBlue, 3 ) && testSpinnerColor( mediumBlue, "rgb(0, 0, 255)"), "medium blue spinners work" );
	var largeWhite = createSpinner( 'large', 'white' );
	ok( testSpinnerSize( largeWhite, 4 ) && testSpinnerColor( largeWhite, "rgb(255, 255, 255)"), "large white spinners work" );
	teardownSpinners();
});
test( "test position and color", function() {
	expect(3);
	var leftRed = createSpinner( 'small-left', 'red' );
	ok( testSpinnerPosition( leftRed, 'left' ) && testSpinnerColor( leftRed, "rgb(255, 0, 0)"), "left red spinners work" );
	var rightWhite = createSpinner( 'small-right', 'white' );
	ok( testSpinnerPosition( rightWhite, 'right' ) && testSpinnerColor( rightWhite, "rgb(255, 255, 255)"), "right white spinners work" );
	var bottomBlue = createSpinner( 'small-bottom', 'blue' );
	ok( testSpinnerPosition( bottomBlue, 'bottom' ) && testSpinnerColor( bottomBlue, "rgb(0, 0, 255)"), "bottom blue spinners work" );
	teardownSpinners();
});
test( "test size, position and color", function() {
	expect(3);
	var smallLeftRed = createSpinner( 'small-left', 'red' );
	ok( testSpinnerSize( smallLeftRed, 2) && testSpinnerPosition( smallLeftRed, 'left' ) && testSpinnerColor( smallLeftRed, "rgb(255, 0, 0)"), "small left red spinners work" );
	var mediumRightWhite = createSpinner( 'medium-right', 'white' );
	ok( testSpinnerSize( mediumRightWhite, 3) && testSpinnerPosition( mediumRightWhite, 'right' ) && testSpinnerColor( mediumRightWhite, "rgb(255, 255, 255)"), "medium right white spinners work" );
	var largeBottomBlue = createSpinner( 'large-bottom', 'blue' );
	ok( testSpinnerSize( largeBottomBlue, 4) && testSpinnerPosition( largeBottomBlue, 'bottom' ) && testSpinnerColor( largeBottomBlue, "rgb(0, 0, 255)"), "large bottom blue spinners work" );
	teardownSpinners();
});
test( "test destruction", function() {
	expect(1);
	var $spinnerHarness = $('<div class="spinner-test-harness" />');
	$spinnerHarness.appendTo( 'body').spin();
	$spinnerHarness.spin( false );
	ok( $spinnerHarness.children( '.spinner' ).length === 0, 'spinner successfully destroyed' );
	teardownSpinners();
});