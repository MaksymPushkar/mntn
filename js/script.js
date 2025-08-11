"use strict";

window.onload = function () {
	const header = document.querySelector('header');
	const headerTop = document.querySelector('.header__top');

	if (header && headerTop) {
		let headerTopStyles = getComputedStyle(headerTop);
		document.body.style.setProperty(`--header-top-height`, `${headerTop.offsetHeight}px`);
		let headerTopPaddingTop = parseFloat(headerTopStyles.paddingTop);
		let headerTopHeightWithoutPaddingBottom = headerTop.offsetHeight - parseFloat(headerTopStyles.paddingBottom);

		header.style.setProperty(`--header-top-bg-img`, `linear-gradient(0deg,rgba(34, 193, 195, 0) 0%,rgba(11, 29, 38, 0.4) ${100 - (headerTopHeightWithoutPaddingBottom / headerTop.offsetHeight * 100)}%,rgba(11, 29, 38, 1) 100%	)`)

		window.addEventListener(`resize`, () => {
			document.body.style.setProperty(`--header-top-height`, `${headerTop.offsetHeight}px`);
			headerTopPaddingTop = parseFloat(headerTopStyles.paddingTop);
			headerTopHeightWithoutPaddingBottom = headerTop.offsetHeight - parseFloat(headerTopStyles.paddingBottom);

			header.style.setProperty(`--header-top-bg-img`, `linear-gradient(0deg,rgba(34, 193, 195, 0) 0%,rgba(11, 29, 38, 0.4) ${100 - (headerTopHeightWithoutPaddingBottom / headerTop.offsetHeight * 100)}%,rgba(11, 29, 38, 1) 100%	)`)
		})

		if (window.scrollY > 0) {
			header.classList.add('scrolled');

		} else {
			header.classList.remove('scrolled');
		}
		window.addEventListener('scroll', () => {
			if (window.scrollY > 0) {
				header.classList.add('scrolled');

			} else {
				header.classList.remove('scrolled');
			}
		});
	}




	const rightHeaderRow = document.querySelector('.right-header__row');
	const leftHeaderRow = document.querySelector('.left-header__row');
	const itemRoadmap = document.querySelectorAll('.item-roadmap');

	if (rightHeaderRow && itemRoadmap) {
		for (let i = 0; i < itemRoadmap.length; i++) {
			itemRoadmap[i].setAttribute(`id`, `${String(i + 1).padStart(2, `0`)}`)
			rightHeaderRow.insertAdjacentHTML(`beforeend`,
				`<a href="#${String(i + 1).padStart(2, `0`)}" class="right-header__link">${String(i + 1).padStart(2, `0`)}</a>`)
		}
	}




	if (headerTop) {

		function toCenterSideHeaderRow(sideHeaderRow) {
			if (headerTop.offsetHeight * 2 + sideHeaderRow.parentElement.offsetHeight <= window.innerHeight) {
				sideHeaderRow.parentElement.style.marginBottom = `${headerTop.offsetHeight}px` // -30 padding-block
			} else {
				sideHeaderRow.parentElement.style.marginBottom =
					window.innerHeight - headerTop.offsetHeight - sideHeaderRow.parentElement.offsetHeight > 0 ?
						`${window.innerHeight - headerTop.offsetHeight - sideHeaderRow.parentElement.offsetHeight}px` :
						`0`;
			}

			window.addEventListener(`resize`, () => {
				if (headerTop.offsetHeight * 2 + sideHeaderRow.parentElement.offsetHeight <= window.innerHeight) {
					sideHeaderRow.parentElement.style.marginBottom = `${headerTop.offsetHeight}px`
				} else {
					sideHeaderRow.parentElement.style.marginBottom =
						window.innerHeight - headerTop.offsetHeight - sideHeaderRow.parentElement.offsetHeight > 0 ?
							`${window.innerHeight - headerTop.offsetHeight - sideHeaderRow.parentElement.offsetHeight}px` :
							`0`;
				}
			})
		}

		if (leftHeaderRow) toCenterSideHeaderRow(leftHeaderRow)
		if (rightHeaderRow) toCenterSideHeaderRow(rightHeaderRow)

	}



	const footer = document.querySelector(`.footer`);
	const footerContainer = document.querySelector(`.footer__container`);
	const footerMain = document.querySelector(`.footer__main`);
	const footerCopyright = document.querySelector(`.footer__copyright`);
	const footerLists = document.querySelector(`.footer__lists`);


	if (footerLists && footerCopyright && footerContainer && footerMain && footer) {

		footer.classList.remove(`footer--column-one`);
		footerMain.style.maxWidth = ``;

		const footerContainerStyles = getComputedStyle(footerContainer);
		let footerContainerPaddingLeft = parseFloat(footerContainerStyles.paddingLeft);
		let footerContainerPaddingRight = parseFloat(footerContainerStyles.paddingRight);
		let footerContainerStylesColumnGap = parseFloat(footerContainerStyles.columnGap);
		let footerContainerWithoutPadding =
			footerContainer.offsetWidth - footerContainerPaddingLeft - footerContainerPaddingRight;

		if (Math.ceil(footerCopyright.offsetWidth + footerContainerStylesColumnGap + footerLists.offsetWidth + 5) > footerContainerWithoutPadding) {
			footer.classList.add(`footer--column-one`)
			footerMain.style.maxWidth = `none`;
		} else {
			footer.classList.remove(`footer--column-one`)
			footerMain.style.maxWidth = ``;
		}


		window.addEventListener(`resize`, () => {
			footer.classList.remove(`footer--column-one`);
			footerMain.style.maxWidth = ``;

			footerContainerPaddingLeft = parseFloat(footerContainerStyles.paddingLeft);
			footerContainerPaddingRight = parseFloat(footerContainerStyles.paddingRight);
			footerContainerStylesColumnGap = parseFloat(footerContainerStyles.columnGap);
			footerContainerWithoutPadding =
				footerContainer.offsetWidth - footerContainerPaddingLeft - footerContainerPaddingRight;

			if (Math.ceil(footerCopyright.offsetWidth + footerContainerStylesColumnGap + footerLists.offsetWidth + 5) > footerContainerWithoutPadding) {
				footer.classList.add(`footer--column-one`)
				footerMain.style.maxWidth = `none`;
			} else {
				footer.classList.remove(`footer--column-one`)
				footerMain.style.maxWidth = ``;
			}
		})
	}



	const parallax = document.querySelector(`.hero`);
	let animParalaxId;

	let positionX = 0, positionY = 0;
	let coordXprocent = 0, coordYprocent = 0;

	let parallaxObserver;

	function countCoordParallax(e) {
		const parallaxWidth = parallax.offsetWidth;
		const parallaxHeight = parallax.offsetHeight;

		const coordX = e.pageX - parallaxWidth / 2;
		const coordY = e.pageY - parallaxHeight / 2;

		coordXprocent = coordX / parallaxWidth * 100;
		coordYprocent = coordY / parallaxHeight * 100;
	}

	function startParallax() {
		const content = document.querySelector(`.hero__container`);
		const clouds = document.querySelector(`.imgs-hero__clouds`);
		const mountains = document.querySelector(`.imgs-hero__mountains`);
		const human = document.querySelector(`.imgs-hero__human`);

		const forClouds = 40;
		const forMountains = 20;
		const forHuman = 40;

		const speed = 0.05;

		positionX = 0, positionY = 0;
		coordXprocent = 0, coordYprocent = 0;

		function setMouseParallaxStyle() {
			const distX = coordXprocent - positionX;
			const distY = coordYprocent - positionY;


			positionX = positionX + (distX * speed);
			positionY = positionY + (distY * speed);

			clouds.style.cssText = `transform: translate(${positionX / forClouds}%, ${positionY / forClouds}%);`;
			mountains.style.cssText = `transform: translate(${positionX / forMountains}%, ${positionY / forMountains}%);`;
			human.style.cssText = `transform: translate(${positionX / forHuman}%, ${positionY / forHuman}%);`;

			animParalaxId = requestAnimationFrame(setMouseParallaxStyle);
		}

		setMouseParallaxStyle();
		parallax.addEventListener(`mousemove`, countCoordParallax)


		// parallax scroll

		let thresholdSets = [];
		for (let i = 0; i <= 1.0; i += 0.005) {
			thresholdSets.push(i);
		}
		const callback = function (entries, parallaxObserver) {
			const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
			setParallaxItemsStyle(scrollTopProcent);
		};
		parallaxObserver = new IntersectionObserver(callback, {
			threshold: thresholdSets
		});

		parallaxObserver.observe(document.querySelector(`.content`));

		function setParallaxItemsStyle(scrollTopProcent) {
			content.style.cssText = `transform: translate(0%,-${scrollTopProcent / 9}%);`;
			mountains.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 6}%);`;
			human.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 3}%);`;
		}
	}

	function stopParallax() {
		cancelAnimationFrame(animParalaxId);
		parallax.removeEventListener(`mousemove`, countCoordParallax);
		parallaxObserver.disconnect();
	}

	if (parallax) {
		if (window.scrollY < parallax.offsetHeight) {
			if (parallax.hasAttribute(`data-parallax-active`)) {

			} else {
				startParallax();
				parallax.dataset.parallaxActive = ``;
			}

		} else {
			stopParallax();
			parallax.removeAttribute(`data-parallax-active`);
		}

		window.addEventListener(`scroll`, () => {
			if (window.scrollY < parallax.offsetHeight) {

				if (parallax.hasAttribute(`data-parallax-active`)) {

				} else {
					startParallax();
					parallax.dataset.parallaxActive = ``;
				}
			} else {
				stopParallax();
				parallax.removeAttribute(`data-parallax-active`);
			}
		})


	}



	document.body.classList.add(`loaded`);

	const options = {
		root: null,
		rootMargin: "0px 0px 0px 0px",
		threshhold: 0.3,
	}

	let callback = (entries, observer) => {
		entries.forEach((entry) => {
			const targetElement = entry.target;
			if (entry.isIntersecting) {
				targetElement.classList.add("animate");
			}
		})
	}

	let observer = new IntersectionObserver(callback, options);

	let someElements = document.querySelectorAll("[class*='--anim']");
	setTimeout(() => {
		someElements.forEach(someElement => {
			observer.observe(someElement)
		})
	}, 800)
};
