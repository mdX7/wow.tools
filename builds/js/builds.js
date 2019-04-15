$( document ).ready(function() {
	let build1;
	let build2;

	function resetDiffs() {
		build1 = null;
		build2 = null;
		$('.diffbadge').remove();
		$('#openDiffButton').hide();
		$('#resetButton').hide();
		$('#diffButton').show();
		$('#buildtable tbody').off('click', 'tr', onBuildClick);
	}

	$('#diffButton').on('click', function() {
		$('#buildtable tbody').on('click', 'tr', onBuildClick);
		$('#diffButton').hide();
		$('#resetButton').show();
		$('#openDiffButton')
			.attr('href', '#')
			.text('Click the row of the first build (old)')
			.show();

		return false;
	}).removeClass('disabled');

	$('#resetButton').on('click', function() {
		resetDiffs();
		return false;
	});
	$('#openDiffButton').on('click', function() {
		if (!build1 || !build2) {
			return false;
		}

		resetDiffs();
	});

	function onBuildClick() {
		const hashElement = $(this).find('.buildconfighash');

		if (!build1) {
			build1 = hashElement.text();
			hashElement.after(' <span class="badge badge-danger diffbadge">Old build</span>');
			$('#openDiffButton').text('Click the row of the second build (new)');
		} else if(!build2) {
			build2 = hashElement.text();
			hashElement.after(' <span class="badge badge-danger diffbadge">New build</span>');
			$('#openDiffButton')
				.text('Click to diff (might take up to a minute to generate)')
				.attr('href', '/builds/diff.php?from=' + build1 + '&to=' + build2);
		}
	}
});