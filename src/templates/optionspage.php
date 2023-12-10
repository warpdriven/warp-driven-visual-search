<?php
    if (!defined("ABSPATH"))
        exit;
?>

<div class="wrap">
    <h2>WarpDriven VSR Setting</h2>
    <form method="post" action="options.php">
        <?php settings_fields("warp-driven-settings-group") ?>
        <?php do_settings_sections("warp-driven-settings-group") ?>
        <table class="form-table">
            <input type="hidden" name="wd_consumer_key" value="<?php echo get_option('wd_consumer_key'); ?>"/>
            <input type="hidden" name="wd_consumer_secret" value="<?php echo get_option('wd_consumer_secret'); ?>"/>
            <tr valign="top">
                <th scope="row">API Key</th>
                <td>
                    <input type="text" name="wd_api_key" value="<?php echo get_option('wd_api_key'); ?>"/>
                </td>
            </tr>
            <tr valign="top">
                <th scope="row">Data server key</th>
                <td>
                    <input type="text" name="wd_data_server_key" value="<?php echo get_option('wd_data_server_key'); ?>"/>
                </td>
            </tr>
            <tr valign="top">
                <th scope="row">Data server</th>
                <td>
                    <input type="text" name="wd_data_server" value="<?php echo get_option('wd_data_server'); ?>"/>
                </td>
            </tr>
            <tr valign="top">
                <th scope="row">Custom js</th>
                <td>
                    <input type="text" name="wd_custom_js" value="<?php echo get_option('wd_custom_js'); ?>"/>
                </td>
            </tr>
            <tr valign="top">
                <th scope="row">Test mode</th>
                <td>
                    <?php $checkedVal = get_option('wd_is_test_mode');?>
                    <?php $checkedFlg = ($checkedVal) ? 'checked="checked"' : '' ?>
                    <label for="wd_is_test_mode">
                        <input type="checkbox" id="wd_is_test_mode" name="wd_is_test_mode" <?php echo $checkedFlg; ?>/>
                    </label>
                </td>
            </tr>
        </table>
        <?php submit_button() ?>
    </form>
</div>