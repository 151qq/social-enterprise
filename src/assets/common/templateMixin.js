export default {
    computed: {
        arTitle () {
            var styleData = {
                'display': 'block',
                'padding': '0 15px',
                'box-sizing': 'border-box',
                'background-position': 'center',
                'background-size': '100% 100%',
                'overflow': 'hidden',
                'height': this.base.titleBlockHeight + 'px',
                'background-image': 'url(' + this.base.titleBackground + ')',
                'font-size': this.base.titleFontSize + 'px',
                'text-align': this.base.titleAlignment,
                'font-style': this.base.titleFontStyle,
                'color': this.base.titleFontColor,
                'line-height': this.base.titleLineHeight + 'px',
                'padding-top': this.base.titleTopHeight + 'px',
                'margin-top': this.base.titleMarginTop + 'px'
            }

            return styleData
        },
        arAuthorDate () {
            var styleData = {
                'display': 'flex',
                'padding': '0 15px',
                'box-sizing': 'border-box',
                'justify-content': this.base.editorDateStyle,
                'overflow': 'hidden',
                'height': this.base.editorDateBlockHeight + 'px',
                'font-size': this.base.editorDateFontSize + 'px',
                'font-style': this.base.editorDateFontStyle,
                'color': this.base.editorDateFontColor,
                'line-height': this.base.editorDateLineHeight + 'px'
            }

            return styleData
        },
        arAuthor () {
            var styleData = {
                'color': this.base.editorLink ? '#368ccd' : this.base.editorDateFontColor,
                'margin-left': this.base.editorDateSpace + 'px'
            }

            return styleData
        },
        arTextBody () {
            var styleData = {
                'padding': '15px',
                'display': 'block',
                'box-sizing': 'border-box',
                'background-repeat-y': 'repeat',
                'background-repeat-x': 'no-repeat',
                'background-size': '100% 100%',
                'overflow': 'hidden',
                'background-image': 'url(' + this.base.fileBackground + ')',
                'padding-top': this.base.fileBlcokTopHeight + 'px'
            }

            return styleData
        },
        arImg () {
            var styleData = {
                'display': 'block',
                'width': '100%',
                'margin-top': this.base.fileMarginTop + 'px'
            }

            return styleData
        },
        arInTitle () {
            var styleData = {
                'display': 'block',
                'box-sizing': 'border-box',
                'background-repeat-y': 'no-repeat',
                'background-repeat-x': 'no-repeat',
                'background-position': 'center',
                'background-size': '100% 100%',
                'overflow': 'hidden',
                'height': this.base.innerTitleBlockHeight + 'px',
                'background-image': 'url(' + this.base.innerTitleBackground + ')',
                'font-size': this.base.innerTitleFontSize + 'px',
                'text-align': this.base.innerTitleAlignment,
                'font-style': this.base.innerTitleFontStyle,
                'color': this.base.innerTitleFontColor,
                'line-height': this.base.innerTitleFontType + 'px',
                'padding-top': this.base.innerTitleTopHeight + 'px',
                'margin-top': this.base.innerTitleMarginTop + 'px'
            }

            return styleData
        },
        arContent () {
            var styleData = {
                'display': 'block',
                'box-sizing': 'border-box',
                'overflow': 'hidden',
                'font-size': this.base.fileFontSize + 'px',
                'color': this.base.fileTaxtFontColor,
                'line-height': this.base.fileTaxtLineHeight + 'px',
                'margin-top': this.base.fileMarginTop + 'px'
            }

            return styleData
        }
    }
}