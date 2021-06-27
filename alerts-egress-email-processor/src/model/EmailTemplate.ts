export const mailHeader = `<head>
<style>
    .table-wrap {
        width: 100%;
        max-width: none;
        margin-bottom: 20px;
        border-collapse: collapse;
    }

    .table-wrap tr {
        font-size: 13px;
        line-height: 20px;
        border: 1px solid #e9ecef;
        border-bottom: 0;
        transition: background-color .3s
    }

    .table-wrap tr:last-of-type {
        border-bottom: 1px solid #e9ecef
    }

    .table-wrap tr:nth-child(2n) td:empty:after {
        width: 40%
    }

    .table-wrap td,
    .table-wrap th {
        padding: 20px 12px;
    }

    .table-wrap td.align-center,
    .table-wrap th.align-center {
        text-align: center
    }

    .table-wrap td.actions,
    .table-wrap td.align-right,
    .table-wrap th.actions,
    .table-wrap th.align-right {
        text-align: right
    }


    .table-wrap td {
        vertical-align: middle
    }

    .table-wrap td:empty:after {
        display: block;
        width: 60%;
        height: 4px;
        margin: 9px 0 8px;
        content: "";
        background-image: linear-gradient(90deg, #d4dadf, #a9b5c0 50%, #d4dadf), linear-gradient(#d4dadf 4px, transparent 0);
        background-position: 0 0, 0 0;
        background-size: 200% 100%, 100% 100%;
        border-radius: 2px;
        animation: c 1.5s infinite reverse
    }


    .table-wrap th {
        font-size: 13px;
        font-weight: 600;
        line-height: 20px;
        color: #294661;
        text-align: left;
        vertical-align: top;
        background-color: rgb(244, 245, 247);
    }

    .table-wrap thead th {
        font-size: 12px;
        line-height: 15px;
        color: black;
        text-transform: uppercase;
        letter-spacing: 1px;
        vertical-align: middle
    }

    .table-wrap.is-auto-width {
        width: auto
    }

    th,
    td {
        border-bottom: 1px solid #ddd;
    }

    table,
    th,
    td {
        border: 1px solid #ddd;
    }

    tbody tr:hover {
        background-color: #f5f5f5;
    }
</style>
</head>`;

export const getNewLine = (count: number, isHtml = false): string => isHtml
  ? Array(count + 1).join('<br/>')
  : Array(count + 1).join('\n');