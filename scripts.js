const pricingConfig = {
  views: [
    {
      views: "10k",
      aria: "10 thousand PageViews",
      price: 8,
    },
    {
      views: "50K",
      aria: "50 thousand PageViews",
      price: 12,
    },
    {
      views: "100K",
      aria: "100 thousand PageViews",
      price: 16,
    },
    {
      views: "500k",
      aria: "500 thousand PageViews",
      price: 24,
    },
    {
      views: "1m",
      aria: "1 million PageViews",
      price: 36,
    },
  ],
  discount: 0.25,
};

const slider = document.getElementById("pageviews-slider");
const form = document.querySelector("js-form");
const pageviews = document.querySelector("js-views");
const price = document.querySelector("js-price");
const srInfo = document.querySelector("js-sr-info");

function fillSlider() {
  const sliderProgress = hsl(174, 77%, 80%);
  const sliderBackground = hsl(224, 65%, 95%);

  const breakpoint = "${Number(slider.value) * 25}%";

  slider.style.backgroundImage = "linear-gradient(90deg, 
        ${sliderProgress} ${breakpoint}, 
        ${sliderBackground} ${breakpoint})";
}

function getPageViews(index) {
  return `${pricingConfig.views[index].views}`;
}

function getAriaPageViews(index) {
  return `${pricingConfig.views[index].aria}`;
}

function getPrice(index) {
  if (form.billing.value === "yearly") {
    return pricingConfig.views[index].price * (1 - pricingConfig.discount);
  } else {
    return pricingConfig.views[index].price;
  }
}

function updateSrInfo(index) {
  return `${getAriaPageViews(index)} ${getPrice(index)} dollars per month`;
}

fillSlider();

slider.addEventListener("change", (e) => {
  fillSlider();
});

form.addEventListener("change", (e) => {
  switch (e.target.name) {
    case "pageviews":
      pageviews.textContent = getPageViews(e.target.value);
      price.textContent = getPrice(e.target.value).toFixed(2);
      srInfo.textContent = updateSrInfo(e.target.value);
      break;
    case "billing":
      price.textContent = getPrice(form.pageviews.value).toFixed(2);
      srInfo.textContent = updateSrInfo(form.pageviews.value);
  }
});
