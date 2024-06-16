=== Warp Driven Recommendation System ===
Contributors: Warp Driven Technology
Donate link: https://warp-driven.com/
Requires at least: 5.9
Requires PHP: 5.6
Tested up to: 6.4.2
Stable tag: 2.0.1
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

== Description ==

Intelligent recommendations use predictive analytics to recommend items and services to customers based on their past behaviours, preferences, and interests. They are used by businesses to increase customer engagement, provide a more personalised experience, and improve customer retention. Intelligent recommendations can be based on data from customer surveys, browsing behaviours, and purchase histories, as well as other sources of customer data. They are often implemented as part of a larger customer relationship management system, and have been shown to be effective in increasing customer satisfaction, loyalty, and revenue.

Product recommendations are a critical aspect of any retailer’s ecommerce strategy. Smart recommendations help customers find relevant products at lower costs. A product recommended at the right time can influence buying of a product over another. Product recommendations can help boost sales and, thereby, profits too.

In a traditional search system, the objective is to return results that are similar to a query object in one dimension or multiple dimensions based on product features. Recommendations added differentiate and personalise across queries based-on user behaviour analytics.

Ecommerce businesses must keep customers interested long enough for purchase decisions to be made. They must make suitable recommendations to keep customers interested. In fact, smart recommendations can stimulate impulse purchases too.

A study shows that product recommendations account for one-third of online revenue and can reduce cart abandonment by 4.35%. Leading ecommerce sites acknowledge that over 30% of their revenue is earned from purchase of recommended products.

Warp Driven Recommendation System would help improve your website conversion rate, get more recurring visitors, make longer user sessions and know what your visitors are looking for.

- **Improved User Experience**: With user behaviors based and visually similar recommendations, customers enjoy a superior and personalised online shopping experience.
- **Increased Conversion Rates**: Relevant product suggestions help users find what they’re looking for, driving higher conversions and sales.
- **Enhanced Customer Retention**: By providing tailored recommendations, the system promotes customer satisfaction and fosters brand loyalty.
- **More Efficient Stock Management**: Insights on customer preferences can optimise inventory planning and management.
- **Seamlessly integration with supply chain system**: allowing merchants list recommended products based on ccustomer preferences directly from our supply chain.

**Target Audience**: Our application caters to a broad spectrum of merchants, with optimal results observed for stores boasting 100+ products and a monthly visits count exceeding 100,000. Notably, our Visually Similar Recommendations feature stands out, making it particularly advantageous for fashion, furniture, and visually-oriented shops, thereby boosting conversion rates.

**Pricing Structure**: Currently, there is no upfront fee for merchants. We operate on a post-payment model, collecting a monthly commission of approximately 5% based on the item's sale price as recommended through our widgets.

This plugin would show the intelligent recommendations or visually similar recommendations on product detail page with a widget on the page bottom.

By several clicks, you can add the Recommendation System function to your website quickly:

## 1. Install the plugin

### MINIMUM REQUIREMENTS

- WooCommerce 2.2 or later
- WordPress 3.5 or later

### AUTOMATIC INSTALLATION

Automatic installation is the easiest option as WordPress handles the file transfers itself and you don’t even need to leave your web browser. To do an automatic install of WarpDriven Visual Search, login to your WordPress admin panel, navigate to the Plugins menu and click Add New.

In the search field type “Warp Driven” and click “Warp Driven Visual Search” Plugins. You can install it by simply clicking Install Now. After clicking that link you will be asked if you’re sure you want to install the plugin. Click yes and WordPress will automatically complete the installation. After installation has finished, click the ‘activate plugin’ link.

### MANUAL INSTALLATION VIA THE WORDPRESS INTERFACE

1. Download the plugin zip file to your computer
2. Go to the WordPress admin panel menu Plugins > Add New
3. Choose upload
4. Upload the plugin zip file, the plugin will now be installed
5. After installation has finished, click the ‘activate plugin’ link

### MANUAL INSTALLATION VIA FTP

1. Download the plugin file to your computer and unzip it
2. Using an FTP program, or your hosting control panel, upload the unzipped plugin folder to your WordPress installation’s wp-content/plugins/ directory.
3. Activate the plugin from the Plugins menu within the WordPress admin.

### 2. Register a WarpDriven account

Got to WarpDriven AI website: [https://warpdriven.ai](https://warpdriven.ai), register a new account

### 3. Choose a plan and subscribe it

[https://warpdriven.ai/connection/new-connection/](https://warpdriven.ai/connection/new-connection/)

Connect your WooCommerce shop, after confirmed the authorization in your shop website, you will see the **RECOMMENDER API KEY** in the My Connections table.

## 4. Apply to try the Recommendation System

WarpDriven Recommendation System is a semi-customised SaaS platform.

Please submit your request here:
[https://warpdriven.ai/ticket](https://warpdriven.ai/ticket)

Once got approved, you will see the recommendation system dashboard and settings pages.

Then you can do next:

## 5. Choose products and init them

- Got to Recommendation Settings page: [https://warpdriven.ai/recommender/settings/](https://warpdriven.ai/recommender/settings/)
- Choose all product categories you preferred in your shop, then click the start button to init the products with WarpDriven Recommender API.

## 6. Wordpress Warp Driven Recommendation System Plugin Setting

Please follow the steps below:

1. Open your WordPress website.
2. Access the backend dashboard.
3. In the left navigation menu, select the "WarpDriven AI" option to open the plugin settings page.
4. Fill out the form according to the following rules:

   a. Fill in the Recommendation API Key (this is mandatory).

   b. Fill in the Data Server Key (this is not mandatory, but the data dashboard function depends on it).

   c. Turn off Test mode if you passed the testing. If not, just read the Regarding Test Mode part first.

### Additional information

#### Regarding the Recommendation API Key

You can find it at <https://warpdriven.ai/connection/my-connection/>. Please note that if you have connected multiple websites on our platform, the Recommendation API Key for each website is different and cannot be used interchangeably.

#### Regarding the Data Server Key

By default, we do not generate a Data Server Key when establishing a connection with your website, so you cannot obtain it in the same way as the Recommendation API Key. Please contact us at <https://warpdriven.ai/ticket/> to obtain it.

#### Regarding Test Mode

The main function of this plugin is to add a product recommendation component to your product detail pages. If you want to view the functionality of the recommendation component without disturbing buyers, enable Test mode. When Test mode is enabled, the recommendation component will only work when the browser address bar's query parameter includes wd_demo=true.

- When Test mode is enabled:

    <https://yourstore.com/product/product-slug>, the recommendation component will not be displayed.
    <https://yourstore.com/product/product-slug?wd_demo=true>, the recommendation component will be displayed as usual.
    <https://yourstore.com/product/product-slug?else_search=else_value&wd_demo=true>, the recommendation component will be displayed as usual.

- When Test mode is disabled:

    The recommendation component will be displayed to buyers only if you have correctly filled in the Recommendation API Key, and your products have been initialized successfully.

#### Regarding Custom Data Server

By default, the functionality of recommendation components on all websites is centrally stored on the same server. If you, for security reasons or to customize the recommendation algorithm for your products, want us to handle your data separately, please contact us at <https://warpdriven.ai/ticket/> to obtain it.

#### Regarding Custom JS

By default, the style of the recommendation component may not match your website's design, or you may need some more advanced features. If you want us to customize the product recommendation component specifically for your website, please contact us at <https://warpdriven.ai/ticket/> to obtain it.

## 7 Testing Stage

That’s it! After the init process finished (it may take a little long time which depends on the inited product number), you can go to the product detail page to see the Recommendation System results!

Any technical questions, please don’t hesitate to contact us:

- <support@warpdriven.com.au>

## TERMS AND PRIVACY POLICY

You can find more details on WarpDriven’s terms and privacy policy in the following links: [Privacy Polic](https://warp-driven.com/privacy-policy/)

## Development

### Changelog

#### 2.0.0

- Integrated WooCommerce Plugin with WarpDriven Recommender API
- Implemented OAuth signin from WordPress shop to WarpDriven.AI platform

#### 1.0.0

- Integrated WooCommerce Plugin with WarpDriven AI API
- Implemented WooCommerce feed pagination
- Integrated Visually Similar Search widget and Discovery View on product list page into one WooCommerce Plugin