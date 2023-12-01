<?php
    if (!defined("ABSPATH"))
        exit;
?>

<div class="wrap">
    <h2>WarpDriven VSR Setting</h2>
    <form method="post" action="options.php">
        <?php settings_fields("wd-vs-woo-settings-group") ?>
        <?php do_settings_sections("wd-vs-woo-settings-group") ?>
        <table class="form-table">
            <tr valign="top">
                <th scope="row">WarpDriven VSR API Key</th>
                <td>
                    <input type="text" name="wd_api_key" value="<?php echo get_option('wd_api_key'); ?>"/>
                </td>
            </tr>
        </table>
        <?php submit_button() ?>
    </form>
</div>